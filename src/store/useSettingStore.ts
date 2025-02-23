import { settingsAPI } from '@/api/settings-api'

import { type Company } from '@/shared/schemas/company-schema'
import { type Settings } from '@/shared/schemas/settings-schema'
import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { useLocalStorage } from '@vueuse/core'
import { companiesAPI } from '@/api/companies-api'

export const useSettingsStore = defineStore('settings', () => {
  const settingsTemplate: Settings = {
    orderCost: 0,
    hourCost: 0,
    badWeatherSurcharge: 0,
    extraDays: ['понедельник', 'воскресенье'],
    morningSurcharge: 0,
    eveningSurcharge: 0,
    nightSurcharge: 0,
    extraDaySurcharge: 0,
    isRentingTransport: false,
    transportType: 'scooter',
  }

  const localTemlate = {
    isWeatherSurcharge: false,
    isLastWeekHours: false,
    isExtraDay: false,
    hours: 0,
    orders: 0,
    tips: 0,
    morningOrders: 0,
    eveningOrders: 0,
    nightOrders: 0,
  }

  const settings = ref<Settings>(cloneDeep(settingsTemplate))

  const globalSettings = useLocalStorage(
    'global-storage',
    cloneDeep(settingsTemplate)
  )

  const companies = ref<Company[]>()

  const localSettings = reactive({
    isSettingsOpen: false,
    isShiftsOpen: false,
  })

  const storageSettings = useLocalStorage('settings', cloneDeep(localTemlate))

  function setDefaultSettings() {
    settings.value = cloneDeep(settingsTemplate)
  }

  function setGlobalSettings() {
    globalSettings.value = cloneDeep(settingsTemplate)
    settings.value = cloneDeep(globalSettings.value)
  }

  function deleteGlobalSettings() {
    globalSettings.value = null
  }

  function resetStorageSettings() {
    storageSettings.value = cloneDeep(localTemlate)
  }

  return {
    settings,
    companies,
    localSettings,
    globalSettings,
    storageSettings,
    setDefaultSettings,
    setGlobalSettings,
    deleteGlobalSettings,
    resetStorageSettings,
  }
})
