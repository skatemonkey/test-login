<script setup lang="ts">
import { useRoute } from 'vue-router'
import MainLayout from './components/MainLayout.vue'

const route = useRoute()
</script>

<template>
  <MainLayout v-if="route.path !== '/login'">
    <router-view />
  </MainLayout>
  <router-view v-else />
</template>
