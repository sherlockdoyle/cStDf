import { defineAsyncComponent, type Component } from 'vue';
import ctfList from './ordered-ctf-list.json';

export interface Details {
  flagMD5: string;
}
interface CTF {
  name: string;
  details: () => Promise<Details>;
  Description: Component;
  Ctf?: Component;
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
for (const path of ctfList) {
  const fullPathPrefix = `/src/ctfs/${path}/`;
  ctfs[path] = {
    name: names[fullPathPrefix + 'name'],
    details: details[fullPathPrefix + 'details.json'],
    Description: defineAsyncComponent(descriptions[fullPathPrefix + 'description.md']),
    Ctf: defineAsyncComponent(ctfComponents[fullPathPrefix + 'CTF.vue']),
  };
}

export default ctfs;
