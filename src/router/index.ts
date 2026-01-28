import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/constants/routes'
import { PERM, type Permission } from '@/constants/permissions'

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
      meta: { permissions: [PERM.PAGE1_VIEW] satisfies Permission[] },
    },
    {
      path: ROUTES.TABLE2,
      component: () => import('@/pages/Table2Page.vue'),
      meta: { permissions: [PERM.PAGE2_VIEW] satisfies Permission[] },
    },
    {
      path: ROUTES.TABLE3,
      component: () => import('@/pages/Table3Page.vue'),
      meta: { permissions: [PERM.PAGE3_VIEW] satisfies Permission[] },
    },
    {
      path: ROUTES.TABLE4,
      component: () => import('@/pages/Table4Page.vue'),
      meta: { permissions: [PERM.PAGE4_VIEW] satisfies Permission[] },
    },
    {
      path: '/403',
      component: () => import('@/pages/ForbiddenPage.vue'),
      meta: { public: true },w
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  // 1) auth check
  if (!to.meta.public && !auth.isAuthenticated()) {
    return { path: ROUTES.LOGIN }
  }

  // 2) already logged in -> kick out of login
  if (to.path === ROUTES.LOGIN && auth.isAuthenticated()) {
    return { path: ROUTES.HOME }
  }

  // 3) permission check (after auth)
  const required = to.meta.permissions as Permission[] | undefined
  if (!required?.length) return true

  const userPerms = JSON.parse(localStorage.getItem('permissions') || '[]') as Permission[]
  const allowed = required.every((p) => userPerms.includes(p))

  return allowed ? true : { path: '/403' }
})

export default router
