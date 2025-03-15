import type {
  Courier,
  CourierForm,
  CourierLoginForm,
} from '@/shared/schemas/courier-schema'
import { courierAPI } from '@/api/courier-api'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from './useSettingStore'
import { cloneDeep } from 'lodash'
import { useCompanyStore } from './useCompanyStore'
import type { Company } from '@/shared/schemas/company-schema'
import type { Settings } from '@/shared/schemas/settings-schema'

let resolveSimplePromise: (value: boolean) => void
export interface ICreatedParams {
  courierForm: CourierForm
  companyForm: Company
  settingsForm: Settings
}
const simplePromise = new Promise<boolean>((resolve) => {
  resolveSimplePromise = resolve
})

export const useCourierStore = defineStore('courier', () => {
  const courierFetched = simplePromise

  const settingsStore = useSettingsStore()
  const companyStore = useCompanyStore()

  const courierTemplate: Courier = {
    id: null,
    name: '',
    phone: '',
    company: companyStore.company,
    settings: settingsStore.settings,
    role: 'user',
  }

  const courier = ref<Courier>(cloneDeep(courierTemplate))

  const isLogin = computed(() => typeof courier.value.id === 'string')

  async function fetchCourier(loginData: CourierLoginForm) {
    const data = await courierAPI.findOne(loginData)
    resolveSimplePromise(true)
    if (!data) return null

    courier.value = data
    settingsStore.settings = data.settings
    companyStore.company = data.company

    return courier.value
  }

  async function createCourier(regData: ICreatedParams) {
    const data = await courierAPI.registration(regData)
    if (!data) return null

    courier.value = data
    settingsStore.settings = data.settings
    companyStore.company = data.company
    return data
  }

  async function autoLogin() {
    const data = await courierAPI.autoLogin()
    resolveSimplePromise(true)
    if (!data) return
    courier.value = data
    settingsStore.settings = data.settings
    companyStore.company = data.company
  }

  async function logout() {
    if (!courier.value.id) return
    const res = await courierAPI.logout(courier.value.id)
    if (!res) return
    courier.value = cloneDeep(courierTemplate)
    settingsStore.settings = courier.value.settings
    companyStore.company = courier.value.company
    return
  }

  return {
    courier,
    courierFetched,
    isLogin,
    fetchCourier,
    autoLogin,
    logout,
    createCourier,
  }
})
