import { createApp } from 'vue';
import { createPinia } from 'pinia';
// reset css
import './assets/style/main/main.css';
import './assets/style/deepchange/index.scss';
import './assets/style/mediachange/index.scss';

import App from './App.vue';
import router from './router';
// Axios
import api from '@/api';
// i18n
import i18n from '@/locales';
// vuetify
import vuetify from '@/config/vuetify';

const app = createApp(App);

app.provide('$axios', api);
app.use(i18n);
app.use(vuetify);
app.use(createPinia());
app.use(router);

app.mount('#app');
