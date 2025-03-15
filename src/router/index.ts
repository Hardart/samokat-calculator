import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import { useCourierStore } from '@/store/useCourierStore'

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
    {
      path: '/shifts',
      component: () => import(`@/views/ShiftsView.vue`),
      meta: { auth: true },
      children: [
        {
          path: '',
          name: 'shifts',
          meta: { auth: true },
          component: () => import(`@/views/ShiftListView.vue`),
        },
        {
          path: ':id',
          name: 'shiftItem',
          meta: { auth: true },
          component: () => import('@/views/ShiftEditView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const courierStore = useCourierStore()
  await courierStore.courierFetched

  if (to.meta?.auth && !courierStore.isLogin) return next({ name: 'home' })
  return next()
})

export default router
