import type { Courier, CourierLoginForm } from '@/shared/schemas/courier-schema'
import { courierAPI } from '@/api/courier-api'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from './useSettingStore'
import { cloneDeep, isEqual } from 'lodash'
import { useCompanyStore } from './useCompanyStore'

export const useCourierStore = defineStore('courier', () => {
  const settingsStore = useSettingsStore()
  const companyStore = useCompanyStore()

  const courierTemplate: Courier = {
    name: '',
    phone: '',
    company: companyStore.company,
    settings: settingsStore.settings,
    role: 'user',
  }

  const courier = ref<Courier>(cloneDeep(courierTemplate))

  const isLogin = computed(() => typeof courier.value?.id === 'string')

  async function fetchCourier(loginData: CourierLoginForm) {
    const data = await courierAPI.findOne(loginData)
    if (!data) return null
    courier.value = data
    settingsStore.settings = courier.value.settings
    companyStore.company = courier.value.company
    settingsStore.deleteGlobalSettings()
    companyStore.deleteGlobalCompany()
    return courier.value
  }

  async function createCourier() {
    courier.value.company = companyStore.company
    courier.value.settings = settingsStore.settings
    const data = await courierAPI.registration(courier.value)
    console.log(data)
  }

  async function autoLogin() {
    const data = await courierAPI.autoLogin()
    if (!data) {
      settingsStore.setGlobalSettings()
      companyStore.setGlobalCompany()
      return
    }
    courier.value = data
    settingsStore.settings = courier.value.settings
    companyStore.company = courier.value.company
    settingsStore.deleteGlobalSettings()
    companyStore.deleteGlobalCompany()
    return
  }

  async function logout() {
    if (!courier.value?.id) return
    const res = await courierAPI.logout(courier.value.id)
    if (res) {
      courier.value = cloneDeep(courierTemplate)
      settingsStore.setGlobalSettings()
      companyStore.setGlobalCompany()
    }
    return
  }

  return {
    courier,
    isLogin,
    fetchCourier,
    autoLogin,
    logout,
    createCourier,
  }
})
