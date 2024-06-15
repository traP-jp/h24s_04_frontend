import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/slides/:id',
      name: 'slideDetail',
      component: () => import('../views/SlideDetailView.vue')
    }
  ]
})

export default router
