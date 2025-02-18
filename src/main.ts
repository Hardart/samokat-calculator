import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import { useGlobalSettingsStore } from '@/store/useSettingStore'
import { useCourierStore } from '@/store/useCourierStore'
import { companiesAPI } from './api/companies-api'

const app = createApp(App)
const pinia = createPinia()
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(ToastService)
app.use(router)
app.use(pinia)
const settingsStore = useGlobalSettingsStore()
const courierStore = useCourierStore()

;(async function () {
  await settingsStore.fetchSettings()
  await courierStore.autoLogin()
  app.mount('#app')
})()
