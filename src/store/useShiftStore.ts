type PartOfDay = 'morning' | 'evening' | 'night'

import { computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useSettingsStore } from './useSettingStore'
import { useCompanyStore } from './useCompanyStore'

export const useShiftStore = defineStore('shift', () => {
  const settingsStore = useSettingsStore()
  const companyStore = useCompanyStore()

  const { settings, storageSettings } = storeToRefs(settingsStore)
  const { company } = storeToRefs(companyStore)

  const singleOrderCost = computed(() => {
    let orderCost = settings.value.orderCost
    if (storageSettings.value.isWeatherSurcharge) {
      orderCost += settings.value.badWeatherSurcharge
    }
    return orderCost
  })

  const singleHourPrice = computed(() => {
    let price = settings.value.hourCost
    price += _addExtraDaySurcharge()
    price += _lastWeekBonusSurcharge()
    return price
  })

  const ordersSum = computed(() => {
    let sum = storageSettings.value.orders * singleOrderCost.value

    const partsOfDay: PartOfDay[] = ['morning', 'evening', 'night']
    partsOfDay.forEach((part) => {
      sum += _partsOfDaySum(part)
    })

    return sum
  })

  const hoursSum = computed(
    () => storageSettings.value.hours * singleHourPrice.value
  )

  const profitForDay = computed(() => {
    return hoursSum.value + ordersSum.value + storageSettings.value.tips
  })

  function _lastWeekBonusSurcharge() {
    if (!company.value || !storageSettings.value.isLastWeekHours) return 0
    return company.value.lastWeekBonusCost
  }

  function _addExtraDaySurcharge() {
    if (!storageSettings.value.isExtraDay) return 0
    return settings.value.extraDaySurcharge
  }

  function _isOverOrders(someOrders: number) {
    return someOrders <= storageSettings.value.orders
  }

  function _partsOfDaySum(partOfDay: PartOfDay) {
    if (!storageSettings.value[`${partOfDay}Orders`]) return 0

    return (
      settings.value[`${partOfDay}Surcharge`] *
      (_isOverOrders(storageSettings.value[`${partOfDay}Orders`])
        ? storageSettings.value[`${partOfDay}Orders`]
        : storageSettings.value.orders)
    )
  }

  return { profitForDay, storageSettings, singleHourPrice, singleOrderCost }
})
