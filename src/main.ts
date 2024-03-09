import './assets/style/main/main.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
// 复写css
import './assets/style/deepchange/index.scss';
import './assets/style/mediachange/index.scss';

import App from './App.vue';
import router from './router';
// Axios
import api from './api';

const app = createApp(App);

app.provide('$axios', api);
app.use(createPinia());
app.use(router);

app.mount('#app');
