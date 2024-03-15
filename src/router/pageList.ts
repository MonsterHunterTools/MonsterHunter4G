export default [
  {
    path: '/home',
    name: 'home',
    // @ts-ignore
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/questsediter',
    name: 'QuestsEditer',
    // @ts-ignore
    component: () => import('@/views/guild/QuestsEditer.vue')
  }
];
