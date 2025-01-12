import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { settings } from './localData'

export const hoursData = useLocalStorage('hours', {
  hours: 0,
  EXTRA_MONEY_PER_HOUR: 15,
  EXTRA_MONEY_PER_HOUR_FOR_LASTWEEK: 10,
  SCOOTER_HOUR_PRICE: 130,
  BICYCLE_HOUR_PRICE: 110,
})

export const singleHourPrice = computed(() => {
  let price = settings.value.isBicycle
    ? hoursData.value.BICYCLE_HOUR_PRICE
    : hoursData.value.SCOOTER_HOUR_PRICE
  if (settings.value.isExtraDay) price += hoursData.value.EXTRA_MONEY_PER_HOUR
  if (settings.value.isLastWeekHours)
    price += hoursData.value.EXTRA_MONEY_PER_HOUR_FOR_LASTWEEK
  return price
})

export const hoursSum = computed(
  () => hoursData.value.hours * singleHourPrice.value
)
