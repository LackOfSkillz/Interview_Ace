import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/case/:caseId',
      name: 'case',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CaseView.vue')
    },
    {
      path: '/ledger',
      name: 'ledger',
      component: () => import('../views/LedgerView.vue')
    }
  ]
})

export default router