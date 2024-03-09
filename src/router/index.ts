import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import testpage from './testpage';
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'ScoreBoard',
    //   component: () => import('../views/TestPage/TestPage.vue')
    // },
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
      children: [
        // {
        //   path: '/home',
        //   name: 'home',
        //   component: HomeView
        // },
        ...testpage
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // },
        // {
        //   path: '/computed',
        //   name: 'computed',
        //   component: () => import('../views/TestPage/Computed.vue')
        // },
        // {
        //   path: '/classstyle',
        //   name: 'classstyle',
        //   component: () => import('../views/TestPage/ClassStyle.vue')
        // },
        // {
        //   path: '/vforobject',
        //   name: 'vforobject',
        //   component: () => import('../views/TestPage/VForObject.vue')
        // },
        // {
        //   path: '/watch',
        //   name: 'watch',
        //   component: () => import('../views/TestPage/Watch.vue')
        // },
        // {
        //   path: '/domref',
        //   name: 'domref',
        //   component: () => import('../views/TestPage/DOMRef.vue')
        // },
        // {
        //   path: '/usecomponents',
        //   name: 'usecomponents',
        //   component: () => import('../views/TestPage/UseComponents.vue')
        // },
        // {
        //   path: '/usecomponents1',
        //   name: 'usecomponents1',
        //   component: () => import('../views/TestPage/UseComponents1.vue')
        // },
        // {
        //   path: '/provideinject',
        //   name: 'provideinject',
        //   component: () => import('../views/TestPage/ProvideInject.vue')
        // },
        // {
        //   path: '/animation',
        //   name: 'animation',
        //   component: () => import('../views/TestPage/GSAP/animation.vue')
        // },
        // {
        //   path: '/animationscroll',
        //   name: 'animationscroll',
        //   component: () => import('../views/TestPage/GSAP/AnimationScroll.vue')
        // },
      ]
    }
  ]
});

export default router;
