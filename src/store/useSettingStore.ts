import { type Settings } from '@/shared/schemas/settings-schema'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'

export const useSettingsStore = defineStore('settings', () => {
  const settingsTemplate: Settings = {
    id: null,
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

  const settings = ref<Settings>(cloneDeep(settingsTemplate))

  const localSettings = reactive({
    isSettingsOpen: false,
    isShiftsOpen: false,
    isFeedsOpen: false,
  })

  function setDefaultSettings() {
    settings.value = cloneDeep(settingsTemplate)
  }

  return {
    settings,
    localSettings,
    setDefaultSettings,
  }
})
