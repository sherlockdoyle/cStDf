import { onBeforeUnmount, onMounted } from 'vue';

function getMetaTagContent(property: string, isName?: boolean): string | null {
  const attr = isName ? 'name' : 'property';
  const meta = document.querySelector(`meta[${attr}="${property}"]`);
  return meta?.getAttribute('content') || null;
}
function setMetaTagContent(property: string, content: string | null, isName?: boolean) {
  const attr = isName ? 'name' : 'property';
  let meta = document.querySelector(`meta[${attr}="${property}"]`);
  if (!content) {
    meta?.remove();
    return;
  }

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attr, property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

export default function useMetaTags(ctfName: string, path: string): (summary: string | null) => void {
  const { title } = document,
    description = getMetaTagContent('description', true),
    url = getMetaTagContent('og:url');

  onMounted(() => {
    const title = `${ctfName} - cStDf`;
    document.title = title;
    setMetaTagContent('og:title', title);

    const url = new URL(import.meta.env.VITE_DEPLOYED_URL);
    url.hash = `/ctf/${path}`;
    setMetaTagContent('og:url', url.href);
  });
  onBeforeUnmount(() => {
    document.title = title;
    setMetaTagContent('og:title', title);
    setMetaTagContent('description', description, true);
    setMetaTagContent('og:description', description);
    setMetaTagContent('og:url', url);
  });

  return summary => {
    setMetaTagContent('description', summary, true);
    setMetaTagContent('og:description', summary);
  };
}
