import loadingComponent from '@/components/LoadingComponent.vue';
import { defineAsyncComponent, type Component } from 'vue';
import { type CtfType } from './ctf-type';

interface Details {
  flagMD5: string;
  dependencies?: string[];
  summary: string;
}
interface VueContent {
  type: Extract<CtfType, 'vue'>;
  component: Component;
}
interface UrlContent {
  type: Exclude<CtfType, 'vue'>;
  url: () => Promise<string>;
}
export type CtfContent = VueContent | UrlContent;
interface CTF {
  name: string;
  details: () => Promise<Details>;
  Description: Component;
  content: CtfContent | undefined;
}
// END OF TYPES MARKER

const names = import.meta.glob<true, string, string>('@/ctfs/**/name', {
  query: 'raw',
  eager: true,
  import: 'default',
});
const details = import.meta.glob<boolean, string, Details>('@/ctfs/**/details.json', { import: 'default' });
const descriptions = import.meta.glob<boolean, string, Component>('@/ctfs/**/description.md', { import: 'default' });
const ctfComponents = import.meta.glob<boolean, string, Component>('@/ctfs/**/CTF.vue', { import: 'default' });
const ctfImages = import.meta.glob<boolean, string, string>('@/ctfs/**/CTF.{png,svg}', {
  query: 'url',
  import: 'default',
});
const ctfHtmls = import.meta.glob<boolean, string, string>('@/ctfs/**/CTF.html', { query: 'url', import: 'default' });
const ctfPdfs = import.meta.glob<boolean, string, string>('@/ctfs/**/CTF.pdf', { query: 'url', import: 'default' });
const ctfWavs = import.meta.glob<boolean, string, string>('@/ctfs/**/CTF.wav', { query: 'url', import: 'default' });

const ctfs: Record<string, CTF> = {};
for (const namePath of Object.keys(names)) {
  const pathPrefix = namePath.substring(0, namePath.length - 4); // remove 'name'
  const ctfComponent = ctfComponents[pathPrefix + 'CTF.vue'],
    imageUrl = ctfImages[pathPrefix + 'CTF.png'] ?? ctfImages[pathPrefix + 'CTF.svg'],
    htmlUrl = ctfHtmls[pathPrefix + 'CTF.html'],
    pdfUrl = ctfPdfs[pathPrefix + 'CTF.pdf'],
    audioUrl = ctfWavs[pathPrefix + 'CTF.wav'];

  ctfs[
    pathPrefix.substring(10, pathPrefix.length - 1) // remove '/src/ctfs/' and '/'
  ] = {
    name: names[namePath],
    details: details[pathPrefix + 'details.json'],
    Description: defineAsyncComponent({ loader: descriptions[pathPrefix + 'description.md'], loadingComponent }),
    content: ctfComponent
      ? { type: 'vue', component: defineAsyncComponent({ loader: ctfComponent, loadingComponent }) }
      : imageUrl
        ? { type: 'image', url: imageUrl }
        : htmlUrl
          ? { type: 'html', url: htmlUrl }
          : pdfUrl
            ? { type: 'pdf', url: pdfUrl }
            : audioUrl
              ? { type: 'audio', url: audioUrl }
              : undefined,
  };
}

export default ctfs;
