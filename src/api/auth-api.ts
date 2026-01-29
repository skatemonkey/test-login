import { authClient } from '@/api'
import type { LoginRequest, LoginResponse } from '@/models/auth'

export const authApi = {
  login: (payload: LoginRequest) => authClient.post<LoginResponse>('/login', payload),
}
