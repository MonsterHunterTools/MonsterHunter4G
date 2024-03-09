export default [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/computed',
    name: 'computed',
    component: () => import('../views/TestPage/Computed.vue')
  },
  {
    path: '/classstyle',
    name: 'classstyle',
    component: () => import('../views/TestPage/ClassStyle.vue')
  },
  {
    path: '/vforobject',
    name: 'vforobject',
    component: () => import('../views/TestPage/VForObject.vue')
  },
  {
    path: '/watch',
    name: 'watch',
    component: () => import('../views/TestPage/Watch.vue')
  },
  {
    path: '/domref',
    name: 'domref',
    component: () => import('../views/TestPage/DOMRef.vue')
  },
  {
    path: '/usecomponents',
    name: 'usecomponents',
    component: () => import('../views/TestPage/UseComponents.vue')
  },
  {
    path: '/usecomponents1',
    name: 'usecomponents1',
    component: () => import('../views/TestPage/UseComponents1.vue')
  },
  {
    path: '/provideinject',
    name: 'provideinject',
    component: () => import('../views/TestPage/ProvideInject.vue')
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('../views/TestPage/GSAP/animation.vue')
  },
  {
    path: '/animationscroll',
    name: 'animationscroll',
    component: () => import('../views/TestPage/GSAP/AnimationScroll.vue')
  },
  {
    path: '/animationscroll1',
    name: 'animationscroll1',
    component: () => import('../views/TestPage/GSAP/AnimationScroll1.vue')
  },
  {
    path: '/animationscroll2',
    name: 'animationscroll2',
    component: () => import('../views/TestPage/GSAP/AnimationScroll2.vue')
  },
  {
    path: '/testwebaudio',
    name: 'testwebaudio',
    component: () => import('../views/TestPage/WebAudio/TestOne.vue')
  },
  {
    path: '/testelectron',
    name: 'testelectron',
    component: () => import('../views/TestPage/Electron/test1.vue')
  },
  {
    path: '/testelectronchild',
    name: 'testelectronchild',
    component: () => import('../views/TestPage/Electron/test1child.vue')
  }
];
