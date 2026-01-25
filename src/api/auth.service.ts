import apiClient from './index'

export const authService = {
  login: (username: string, password: string) =>
    apiClient.post<{ token: string }>('/login', { username, password }),

  logout: () => apiClient.post('/logout'),
}
