import { settingsAPI } from '@/api/settings-api'

import { type Company } from '@/shared/schemas/company-schema'
import { type Settings } from '@/shared/schemas/settings-schema'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { useLocalStorage } from '@vueuse/core'
import { companiesAPI } from '@/api/companies-api'

export const useSettingsStore = defineStore('settings', () => {
  const settingsTemplate: Settings = {
    orderCost: 40,
    hourCost: 120,
    badWeatherSurcharge: 10,
    extraDays: ['понедельник', 'воскресенье'],
    morningSurcharge: 30,
    eveningSurcharge: 5,
    nightSurcharge: 70,
    extraDaySurcharge: 15,
    isRentingTransport: false,
    transportType: 'scooter',
  }

  const settings = ref<Settings>(cloneDeep(settingsTemplate))
  const companies = ref<Company[]>()

  const localSettings = reactive({
    isSettingsOpen: false,
  })

  const storageSettings = useLocalStorage('settings', {
    isWeatherSurcharge: false,
    isLastWeekHours: false,
    isExtraDay: false,
    hours: 0,
    orders: 0,
    tips: 0,
    morningOrders: 0,
    eveningOrders: 0,
    nightOrders: 0,
  })

  async function fetchSettings() {
    settings.value = await settingsAPI.getSettings()
    companies.value = await companiesAPI.list()
    if (!settings.value) return

    return
  }

  function setDefaultSettings() {
    settings.value = cloneDeep(settingsTemplate)
  }

  return {
    settings,
    companies,
    localSettings,
    storageSettings,
    fetchSettings,
    setDefaultSettings,
  }
})
