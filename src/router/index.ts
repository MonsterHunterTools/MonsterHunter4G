import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import testpage from './testpage';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'father'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/father',
      name: 'father',
      component: () => import('../views/Index.vue'),
      redirect: 'home',
      children: [...testpage]
    }
  ]
});

export default router;
