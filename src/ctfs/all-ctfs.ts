import { defineAsyncComponent, type Component } from 'vue';

export interface Details {
  flagMD5: string;
}
interface CTF {
  name: string;
  details: () => Promise<Details>;
  Description: Component;
  CtfComponent?: Component;
}

const names = import.meta.glob<true, string, string>('@/ctfs/**/name', {
  query: 'raw',
  eager: true,
  import: 'default',
});
const details = import.meta.glob<boolean, string, Details>('@/ctfs/**/details.json', { import: 'default' });
const descriptions = import.meta.glob<boolean, string, Component>('@/ctfs/**/description.md', { import: 'default' });
const ctfComponents = import.meta.glob<boolean, string, Component>('@/ctfs/**/CTF.vue', { import: 'default' });

const ctfs: Record<string, CTF> = {};
for (const namePath of Object.keys(names)) {
  const pathPrefix = namePath.substring(0, namePath.length - 4); // remove 'name'
  const ctfComponent = ctfComponents[pathPrefix + 'CTF.vue'];

  ctfs[
    pathPrefix.substring(10, pathPrefix.length - 1) // remove '/src/ctfs/' and '/'
  ] = {
    name: names[namePath],
    details: details[pathPrefix + 'details.json'],
    Description: defineAsyncComponent(descriptions[pathPrefix + 'description.md']),
    CtfComponent: ctfComponent && defineAsyncComponent(ctfComponent),
  };
}

export default ctfs;
