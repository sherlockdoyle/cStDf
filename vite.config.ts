import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import { PreRenderedAsset, PreRenderedChunk } from 'rollup';
import markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';
import createCtfMap from './scripts/create-ctf-map';

let id = 0;
const modules: Record<string, string> = {};
function getFileName(chunkInfo: PreRenderedChunk | PreRenderedAsset): string {
  const isChunk = chunkInfo.type === 'chunk';
  const key = isChunk ? (chunkInfo.facadeModuleId ?? chunkInfo.name) : chunkInfo.source.toString();
  if (!(key in modules)) modules[key] = (id++).toString(36);
  return `${modules[key]}.${isChunk ? 'js' : '[ext]'}`;
}

export default defineConfig({
  plugins: [
    createCtfMap,
    vue({ include: [/\.vue$/, /\.md$/] }),
    markdown({
      markdownItSetup: md => {
        const defaultRender =
          md.renderer.rules.link_open ?? ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));
        md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
          tokens[idx].attrSet('target', '_blank'); // add target='_blank' to all links
          return defaultRender(tokens, idx, options, env, self);
        };
      },
    }),
    vuetify(),
    vueJsx(),
  ],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  base: '/cStDf',
  build: {
    rollupOptions: {
      output: { chunkFileNames: getFileName, assetFileNames: getFileName, entryFileNames: getFileName },
    },
  },
});
