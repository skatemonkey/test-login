<script setup lang="ts">
import MainSidebar from '@/components/MainSidebar.vue'
</script>

<template>
  <div class="flex min-h-screen">
    <MainSidebar />
    <main class="flex-1 p-8">
      z
      <slot />
    </main>
  </div>
</template>
