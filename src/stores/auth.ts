// auth.ts store
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  function getToken() {
    return localStorage.getItem('token')
  }

  function getUserId() {
    return localStorage.getItem('userId')
  }

  function getPermissions(): string[] {
    const perms = localStorage.getItem('permissions')
    return perms ? JSON.parse(perms) : []
  }

  function hasPermission(permission: string) {
    return getPermissions().includes(permission)
  }

  function isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  function setAuth(userId: number, token: string, permissions: string[]) {
    localStorage.setItem('userId', String(userId))
    localStorage.setItem('token', token)
    localStorage.setItem('permissions', JSON.stringify(permissions))
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('permissions')
    localStorage.removeItem('userId')
  }

  return { getToken, getPermissions, hasPermission, isAuthenticated, setAuth, logout }
})
