<script setup lang="ts">
import { Home, Table2Icon, LogOut } from 'lucide-vue-next'
import SidebarButton from '@/components/common/SidebarButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'

const authStore = useAuthStore()
const router = useRouter()

const navItems = [
  { to: ROUTES.HOME, icon: Home, label: 'Home' },
  { to: ROUTES.TABLE1, icon: Table2Icon, label: 'Table 1' },
  { to: ROUTES.TABLE2, icon: Table2Icon, label: 'Table 2' },
]

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <aside
    class="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 flex flex-col"
  >
    <div class="mb-8">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white">My App</h1>
    </div>

    <nav class="flex flex-col gap-1 flex-1">
      <SidebarButton
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
      />
    </nav>

    <button
      @click="handleLogout"
      class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      <LogOut class="w-5 h-5" />
      <span>Logout</span>
    </button>
  </aside>
</template>
