import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { settings } from './localData'
import { companyData } from './companyData'
const { company } = companyData()

export const EXTRA_MONEY_PER_HOUR = 15
const EXTRA_MONEY_PER_HOUR_FOR_LASTWEEK = 10
const SCOOTER_HOUR_PRICE = 120
const BICYCLE_HOUR_PRICE = 100

export const hoursData = useLocalStorage('hours', {
  hours: 0,
})

export const singleHourPrice = computed(() => {
  let price = settings.value.isBicycle ? BICYCLE_HOUR_PRICE : SCOOTER_HOUR_PRICE
  if (settings.value.isExtraDay) price += EXTRA_MONEY_PER_HOUR
  if (settings.value.isLastWeekHours) price += EXTRA_MONEY_PER_HOUR_FOR_LASTWEEK
  if (company.value) price += company.value.hourBonus
  return price
})

export const hoursSum = computed(
  () => hoursData.value.hours * singleHourPrice.value
)
