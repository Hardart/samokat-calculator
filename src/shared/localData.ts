import { useLocalStorage } from '@vueuse/core'

import { computed } from 'vue'
import { isInPeriod, today } from './utils'

export interface Shift {
  date: Date
  orders: number
  hours: number
  tips: number
  isWeather: boolean
  profit: number
}

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

export const shift: Shift = {
  date: today,
  orders: 0,
  hours: 0,
  tips: 0,
  isWeather: false,
  profit: 0,
}

export const shifts = useLocalStorage<Shift[]>('shifts', [])

export const shiftsTotal = computed(() =>
  shifts.value.reduce(
    (acc, curr) => {
      if (!isInPeriod(curr.date)) return acc
      acc.hours += curr.hours
      acc.profit += curr.profit
      acc.tips += curr.tips
      acc.orders += curr.orders

      return acc
    },
    { hours: 0, orders: 0, profit: 0, tips: 0 } as Shift
  )
)

export const isShiftSaved = computed(() =>
  shifts.value.some((item) => {
    if (item.date)
      return (
        new Date(item.date).toLocaleDateString() === today.toLocaleDateString()
      )
    return false
  })
)

export const isShowLastWeekHours = computed(() => {
  const isShow = settings.value.company === '2 колеса'
  if (!isShow) settings.value.isLastWeekHours = false
  return isShow
})
