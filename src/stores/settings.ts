import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const settings = useLocalStorage('settings', {
    isBicycle: false,
    isLastWeekHours: false,
    isExtraWeatherMoney: false,
  })

  return { settings }
})
