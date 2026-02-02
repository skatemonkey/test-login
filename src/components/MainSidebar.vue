<script setup lang="ts">
import { computed } from 'vue'
import { Home, Table2Icon, LogOut } from 'lucide-vue-next'
import SidebarButton from '@/components/common/SidebarButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { PERM, type Permission } from '@/constants/permissions'

const authStore = useAuthStore()
const router = useRouter()

const navItems = [
  { to: ROUTES.HOME, icon: Home, label: 'Home' },
  { to: ROUTES.TABLE1, icon: Table2Icon, label: 'Table 1', permission: PERM.PAGE1_VIEW },
  { to: ROUTES.TABLE2, icon: Table2Icon, label: 'Table 2', permission: PERM.PAGE2_VIEW },
  { to: ROUTES.TABLE3, icon: Table2Icon, label: 'Table 3', permission: PERM.PAGE3_VIEW },
  { to: ROUTES.TABLE4, icon: Table2Icon, label: 'Table 4', permission: PERM.PAGE4_VIEW },
  { to: ROUTES.AUDIT_LOG, icon: Table2Icon, label: 'Table 4'},
]

const userPerms = computed(
  () => JSON.parse(localStorage.getItem('permissions') || '[]') as Permission[],
)

const visibleNavItems = computed(() =>
  navItems.filter((item) => !item.permission || userPerms.value.includes(item.permission)),
)

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
        v-for="item in visibleNavItems"
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
