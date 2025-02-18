import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { settings } from './localData'
import { companyData } from './companyData'
const { company } = companyData()

export const EXTRA_MONEY_PER_HOUR = 15
const SCOOTER_HOUR_PRICE = 120
const BICYCLE_HOUR_PRICE = 100

export const hoursData = useLocalStorage('hours', {
  hours: 0,
})

export const singleHourPrice = computed(() => {
  let price = settings.value.isBicycle ? BICYCLE_HOUR_PRICE : SCOOTER_HOUR_PRICE
  if (settings.value.isExtraDay) price += EXTRA_MONEY_PER_HOUR
  if (settings.value.isLastWeekHours && company.value)
    price += company.value.lastWeekBonusCost
  return price
})

export const hoursSum = computed(
  () => hoursData.value.hours * singleHourPrice.value
)
