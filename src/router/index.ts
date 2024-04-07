import CTFView from '@/views/ctf/CTFView.vue';
import MainView from '@/views/main/MainView.vue';
import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: MainView },
    { path: '/ctf/:path(.*)', component: CTFView },
  ],
});

export default router;
