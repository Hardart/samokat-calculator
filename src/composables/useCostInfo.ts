type PartOfDay = 'morning' | 'evening' | 'night'
import { computed } from 'vue'
import { useCompanyStore } from '@/store/useCompanyStore'
import { useUser } from './useUser'
import { useGlobalSettings } from './useGlobalSettings'
import { useUserSettings } from './useUserSettings'
import { useStorageSettings } from './useStorageSettings'

export const useCostInfo = () => {
  const partOfDays: PartOfDay[] = ['morning', 'evening', 'night']
  const companyStore = useCompanyStore()
  const { userSettings } = useUserSettings()
  const { globalSettings } = useGlobalSettings()
  const { storage, partsOfDayCountSum } = useStorageSettings()

  const { isLogin } = useUser()

  const settings = computed(() =>
    isLogin.value ? userSettings : globalSettings.value
  )

  const singleOrderCost = computed(() => {
    let orderCost = settings.value.orderCost
    if (storage.value.isWeatherSurcharge) {
      orderCost += settings.value.badWeatherSurcharge
    }
    return orderCost
  })

  const singleHourCost = computed(() => {
    let price = settings.value.hourCost
    price += _addExtraDaySurcharge()
    price += _lastWeekBonusSurcharge()
    return price
  })
  function _lastWeekBonusSurcharge() {
    if (!companyStore.company || !storage.value.isLastWeekHours) return 0
    return companyStore.company.lastWeekBonusCost
  }
  function _addExtraDaySurcharge() {
    if (!storage.value.isExtraDay) return 0
    return settings.value.extraDaySurcharge
  }

  const ordersSum = computed(() => {
    let sum = storage.value.orders * singleOrderCost.value
    if (isOrdersCountLowerPartsOfDayCountSum.value)
      partOfDays.forEach((part) => (sum += _sumOfParts(part)))

    return sum
  })
  function _sumOfParts(part: PartOfDay) {
    return storage.value[`${part}Orders`] * settings.value[`${part}Surcharge`]
  }

  const hoursSum = computed(() => storage.value.hours * singleHourCost.value)

  const totalEarnings = computed(
    () => hoursSum.value + ordersSum.value + storage.value.tips
  )

  const canAddPartOfDay = computed(
    () => partsOfDayCountSum.value >= storage.value.orders
  )

  const isOrdersCountLowerPartsOfDayCountSum = computed(
    () => partsOfDayCountSum.value <= storage.value.orders
  )

  return {
    singleHourCost,
    singleOrderCost,
    totalEarnings,
    canAddPartOfDay,
  }
}
