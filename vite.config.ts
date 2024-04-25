import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'node:url';
import markdown from 'unplugin-vue-markdown/vite';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), markdown({}), vuetify(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/cStDf',
});
