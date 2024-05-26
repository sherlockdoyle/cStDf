import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
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
      output: { chunkFileNames: '[hash:6].js', assetFileNames: '[hash:1].[ext]', entryFileNames: '[hash:6].js' },
    },
  },
});
