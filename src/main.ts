import '@mdi/font/css/materialdesignicons.min.css';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.use(createVuetify({ theme: { defaultTheme: 'dark' } }));

app.mount('#app');
