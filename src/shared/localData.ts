import { useLocalStorage } from '@vueuse/core'

import { computed } from 'vue'

export const settings = useLocalStorage('settings', {
  isOpen: false,
  isOpenFeeds: false,
  isOpenStatistic: false,
  isBicycle: false,
  isLastWeekHours: false,
  isExtraWeatherMoney: false,
  isExtraDay: false,
  isRentVehicle: false,
  company: undefined,
  userId: '',
})

export const isShowLastWeekHours = computed(() => {
  const isShow = settings.value.company === '2 колеса'
  if (!isShow) settings.value.isLastWeekHours = false
  return isShow
})
