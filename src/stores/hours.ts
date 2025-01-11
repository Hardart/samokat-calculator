import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { dayId } from '@/shared/utils'
import { useSettingsStore } from './settings'
import { useLocalStorage } from '@vueuse/core'

export const useHourStore = defineStore('hour', () => {
  const { settings } = storeToRefs(useSettingsStore())
  const BICYCLE_HOUR_PRICE = 110
  const SCOOTER_HOUR_PRICE = 130

  const hoursSettings = useLocalStorage('hours', {
    hours: 0,
    EXTRA_MONEY_PER_HOUR: 15,
    EXTRA_MONEY_PER_HOUR_FOR_LASTWEEK: 10,
  })

  const daysWithExtraMoney = [1, 7]

  const isTodayExtraMoneyHourDay = computed(() =>
    daysWithExtraMoney.includes(dayId)
  )

  const singleHourPrice = computed(() => {
    let price = settings.value.isBicycle
      ? BICYCLE_HOUR_PRICE
      : SCOOTER_HOUR_PRICE
    if (isTodayExtraMoneyHourDay.value)
      price += hoursSettings.value.EXTRA_MONEY_PER_HOUR
    if (settings.value.isLastWeekHours)
      price += hoursSettings.value.EXTRA_MONEY_PER_HOUR_FOR_LASTWEEK
    return price
  })

  const hoursSum = computed(
    () => hoursSettings.value.hours * singleHourPrice.value
  )

  return {
    hoursSettings,
    singleHourPrice,
    settings,
    hoursSum,
    isTodayExtraMoneyHourDay,
  }
})
