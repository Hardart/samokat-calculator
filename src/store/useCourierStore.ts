import type { Courier, CourierLoginForm } from '@/shared/schemas/courier-schema'
import { courierAPI } from '@/api/courier-api'
import { computed, reactive, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useSettingsStore } from './useSettingStore'
import { cloneDeep, isEqual } from 'lodash'
import { settingsAPI } from '@/api/settings-api'
import { settingsSchema, type Settings } from '@/shared/schemas/settings-schema'
import { companySchema, type Company } from '@/shared/schemas/company-schema'
export const useCourierStore = defineStore('courier', () => {
  const courier = ref<Courier | null>()
  const courierSettingsTemplate = ref<Settings>(settingsSchema._output)
  const courierCompanyTemplate = ref<Company>(companySchema._output)

  const isLogin = computed(() => typeof courier.value?.id === 'string')

  const isRideOnScooter = computed(
    () => courier.value?.settings.transportType === 'scooter'
  )

  const isSettingsChanged = computed(() =>
    isEqual(courierCompanyTemplate.value, courier.value?.company)
  )

  function changeTransportType() {
    if (!courier.value) return
    courier.value.settings.transportType = isRideOnScooter.value
      ? 'bycicle'
      : 'scooter'
  }

  async function fetchCourier(loginData: CourierLoginForm) {
    courier.value = await courierAPI.findOne(loginData)
    if (!courier.value) return null
    _initCourier(courier.value)
    return courier.value
  }

  async function autoLogin() {
    courier.value = await courierAPI.autoLogin()
    if (!courier.value) return null
    _initCourier(courier.value)
    return
  }

  async function logout() {
    if (!courier.value) return
    const res = await courierAPI.logout(courier.value.id)
    if (res) courier.value = null
    return
  }

  async function saveUserSettings() {
    if (!courier.value) return
    const id = await settingsAPI.saveSettings(courier.value)
    _initCourier(courier.value)
    return id
  }

  function _initCourier(courier: Courier) {
    _setDefaultSettings(courier)
    courierSettingsTemplate.value = cloneDeep(courier.settings)
    courierCompanyTemplate.value = cloneDeep(courier.company)
  }

  function _setDefaultSettings(courier: Courier) {
    if (courier.settings) return
    const { settings } = useSettingsStore()

    if (settings) {
      const settingsCopy = cloneDeep(settings)
      delete settingsCopy.id
      delete settingsCopy.__v
      courier.settings = settingsCopy
    }
  }

  return {
    courier,
    isLogin,
    isRideOnScooter,
    isSettingsChanged,
    fetchCourier,
    autoLogin,
    logout,
    saveUserSettings,
    changeTransportType,
  }
})
