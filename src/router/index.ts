import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import Table1Page from '@/pages/Table1Page.vue'
import Table2Page from '@/pages/Table2Page.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/table1', component: Table1Page },
  { path: '/table2', component: Table2Page },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
