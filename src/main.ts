import 'primeicons/primeicons.css'
import '@/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import { useCourierStore } from '@/store/useCourierStore'
import KeyFilter from 'primevue/keyfilter'
import { useNewShiftStore } from './store/useNewShiftStore'

const app = createApp(App)
const pinia = createPinia()
app.directive('keyfilter', KeyFilter)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(ToastService)
app.use(router)
app.use(pinia)
;(async function () {
  await useCourierStore().autoLogin()
  useNewShiftStore().preloadShifts()
  app.mount('#app')
})()
