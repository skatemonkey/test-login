import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/table1',
      name: 'table1',
      component: () => import('@/pages/Table1Page.vue'),
    },
    {
      path: '/table2',
      name: 'table2',
      component: () => import('@/pages/Table2Page.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (!to.meta.public && !auth.isAuthenticated()) {
    // Add ()
    return '/login'
  }

  if (to.path === '/login' && auth.isAuthenticated()) {
    // Add ()
    return '/'
  }
})

export default router
