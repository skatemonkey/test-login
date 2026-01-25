<script setup lang="ts">
import { Home, Table2Icon } from 'lucide-vue-next'
import SidebarButton from '@/components/common/SidebarButton.vue'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/table1', icon: Table2Icon, label: 'Table 1' },
  { to: '/table2', icon: Table2Icon, label: 'Table 2' },
  { to: '/table3', icon: Table2Icon, label: 'Table 3' },
  { to: '/table4', icon: Table2Icon, label: 'Table 4' },
]
</script>

<template>
  <aside
    class="w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4"
  >
    <div class="mb-8">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white">My App</h1>
    </div>

    <nav class="flex flex-col gap-1">
      <SidebarButton
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :icon="item.icon"
        :label="item.label"
      />
    </nav>
  </aside>
</template>
