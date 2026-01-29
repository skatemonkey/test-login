import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@/constants/routes'
import { PERM, type Permission } from '@/constants/permissions'
import { auditService } from '@/services/audit-service'

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
      path: ROUTES.FORBIDDEN,
      component: () => import('@/pages/ForbiddenPage.vue'),
      meta: { public: true },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const userId = Number(localStorage.getItem('userId')) || 0
  const module = to.path.replace('/', '') || 'home'

  // 1) auth check
  if (!to.meta.public && !auth.isAuthenticated()) {
    if (to.path !== ROUTES.FORBIDDEN) {
      auditService.log({
        userId,
        module,
        action: 'view_denied',
        details: { reason: 'not_authenticated' },
      })
    }
    return { path: ROUTES.LOGIN }
  }

  // 2) already logged in -> kick out of login
  if (to.path === ROUTES.LOGIN && auth.isAuthenticated()) {
    return { path: ROUTES.HOME }
  }

  // 3) permission check
  const required = to.meta.permissions as Permission[] | undefined
  if (!required?.length) {
    if (to.path !== ROUTES.FORBIDDEN) {
      auditService.log({ userId, module, action: 'view' })
    }
    return true
  }

  const userPerms = JSON.parse(localStorage.getItem('permissions') || '[]') as Permission[]
  const allowed = required.every((p) => userPerms.includes(p))

  if (allowed) {
    auditService.log({ userId, module, action: 'view' })
    return true
  } else {
    auditService.log({
      userId,
      module,
      action: 'view_denied',
      details: { reason: 'no_permission' },
    })
    return { path: ROUTES.FORBIDDEN }
  }
})

export default router
