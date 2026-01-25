<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Component } from 'vue'

interface Props {
  to: string
  icon: Component
  label: string
}

const props = defineProps<Props>()
const route = useRoute()

const isActive = computed(() => route.path === props.to)
</script>

<template>
  <router-link
    :to="to"
    :class="[
      'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
      'hover:bg-slate-100 dark:hover:bg-slate-800',
      isActive
        ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-medium'
        : 'text-slate-600 dark:text-slate-400',
    ]"
  >
    <component :is="icon" class="w-5 h-5" />
    <span>{{ label }}</span>
  </router-link>
</template>
