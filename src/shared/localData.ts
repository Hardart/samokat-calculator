import { useLocalStorage } from '@vueuse/core'

import { computed } from 'vue'

export interface ISettings {
  isOpen: boolean
  isOpenFeeds: boolean
  isOpenStatistic: boolean
  isBicycle: boolean
  isLastWeekHours: boolean
  isExtraWeatherMoney: boolean
  isExtraDay: boolean
  isRentVehicle: boolean
  company: string | undefined
}

export const settings = useLocalStorage<ISettings>('settings', {
  isOpen: false,
  isOpenFeeds: false,
  isOpenStatistic: false,
  isBicycle: false,
  isLastWeekHours: false,
  isExtraWeatherMoney: false,
  isExtraDay: false,
  isRentVehicle: false,
  company: undefined,
})

export const isShowLastWeekHours = computed(() => {
  const isShow = settings.value.company === '2 колеса'
  if (!isShow) settings.value.isLastWeekHours = false
  return isShow
})
