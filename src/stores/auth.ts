import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  function getToken() {
    return localStorage.getItem('token')
  }

  function isAuthenticated() {
    return !!localStorage.getItem('token')
  }

  function setToken(newToken: string) {
    localStorage.setItem('token', newToken)
  }

  function logout() {
    localStorage.removeItem('token')
  }

  return { getToken, isAuthenticated, setToken, logout }
})
