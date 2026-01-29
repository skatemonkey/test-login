import { authApi } from '@/api/auth-api'
import type { LoginRequest } from '@/models/auth'
import { useAuthStore } from '@/stores/auth.ts'
import { auditService } from '@/services/audit-service'

export const authService = {
  async login(username: string, password: string) {
    const payload: LoginRequest = { username, password }

    try {
      const { data } = await authApi.login(payload)
      useAuthStore().setAuth(data.user_id, data.access_token, data.permissions)

      auditService.log({
        userId: data.user_id,
        module: 'login',
        action: 'login_success',
        details: { username },
      })

      return data
    } catch (error) {
      auditService.log({
        userId: 0,
        module: 'login',
        action: 'login_failed',
        details: { username },
      })
      throw error
    }
  },
}
