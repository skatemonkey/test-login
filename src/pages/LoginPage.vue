<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { authService } from '@/api/auth.service'

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const auth = useAuthStore()

async function login() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await authService.login(username.value, password.value)
    auth.setAuth(data.access_token, data.permissions)
    await nextTick() // Wait for reactivity to update
    await router.push('/')
  } catch {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <form @submit.prevent="login" class="w-80 space-y-4 bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold text-center">Login</h1>
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="w-full p-2 border rounded"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full p-2 border rounded"
        required
      />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
      >
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </form>
  </div>
</template>
