import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(`@/views/LoginView.vue`),
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import(`@/views/RegistrationView.vue`),
    },
  ],
})

export default router
