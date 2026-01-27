import apiClient from './index'
import type { LoginRequest, LoginResponse } from '@/models/auth.ts'

export const authService = {
  login: (username: string, password: string) =>
    apiClient.post<LoginResponse>('/login', { username, password } as LoginRequest),

  logout: () => apiClient.post('/logout'),
}
