import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/constants/routes.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES.LOGIN,
      component: () => import('@/pages/LoginPage.vue'),
      meta: { public: true },
    },
    {
      path: ROUTES.HOME,
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: ROUTES.TABLE1,
      component: () => import('@/pages/Table1Page.vue'),
    },
    {
      path: ROUTES.TABLE2,
      component: () => import('@/pages/Table2Page.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (!to.meta.public && !auth.isAuthenticated()) {
    // Add ()
    return ROUTES.LOGIN
  }

  if (to.path === ROUTES.LOGIN && auth.isAuthenticated()) {
    // Add ()
    return ROUTES.HOME
  }
})

export default router
