import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import pageList from './pageList';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: 'homepage'
    },
    {
      path: '/404',
      name: '404',
      // @ts-ignore
      component: () => import('../views/404.vue')
    },
    {
      path: '/homepage',
      name: 'homepage',
      // @ts-ignore
      component: () => import('../views/Index.vue'),
      redirect: 'home',
      children: [...pageList]
    }
  ]
});

export default router;
