import { useLocalStorage } from '@vueuse/core'

import { computed } from 'vue'
import { today } from './utils'

type Company = '2 колеса' | 'Альянс' | undefined

interface Shift {
  date: Date | null
  orders: number
  hours: number
  tips: number
  isWeather: boolean
  profit: number
}

export const companies: Company[] = ['2 колеса', 'Альянс']

export const settings = useLocalStorage('settings', {
  isOpen: false,
  isBicycle: false,
  isLastWeekHours: false,
  isExtraWeatherMoney: false,
  company: '',
  userId: '',
})

export const shift: Shift = {
  date: null,
  orders: 0,
  hours: 0,
  tips: 0,
  isWeather: false,
  profit: 0,
}

export const shifts = useLocalStorage<Shift[]>('shifts', [])
export const profitForPeriod = computed(() =>
  shifts.value.reduce((acc, curr) => {
    return (acc += curr.profit)
  }, 0)
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
