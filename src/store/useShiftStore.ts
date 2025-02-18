import type { Courier, CourierLoginForm } from '@/shared/schemas/courier-schema'
import { courierAPI } from '@/api/courier-api'

import { computed, reactive, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { shiftSchema } from '@/shared/schemas/shift-schema'
import { useCourierStore } from './useCourierStore'
import { useGlobalSettingsStore } from './useSettingStore'
import { useLocalStorage } from '@vueuse/core'

export const useShiftStore = defineStore('shift', () => {
  const courierStore = useCourierStore()
  const globalStore = useGlobalSettingsStore()
  const { courier, isRideOnScooter } = storeToRefs(courierStore)
  const { settings: globalSettings } = storeToRefs(globalStore)

  const settings = computed(() =>
    courier.value ? courier.value.settings : globalSettings.value
  )

  const baseData = useLocalStorage('baseData', {
    hours: 0,
    orders: 0,
    tips: 0,
    morningOrders: 0,
    eveningOrders: 0,
    nightOrders: 0,
  })

  const _isOverOrders = (someOrders: number) =>
    someOrders <= baseData.value.orders

  const ordersSum = computed(() => {
    if (!settings.value) return 0
    let sum = baseData.value.orders * settings.value?.baseOrderPrice

    if (baseData.value.morningOrders > 0) {
      sum +=
        settings.value.morningBonus *
        (_isOverOrders(baseData.value.morningOrders)
          ? baseData.value.morningOrders
          : baseData.value.orders)
    }

    if (baseData.value.eveningOrders > 0) {
      sum +=
        settings.value.eveningBonus *
        (_isOverOrders(baseData.value.eveningOrders)
          ? baseData.value.eveningOrders
          : baseData.value.orders)
    }

    if (baseData.value.nightOrders > 0) {
      sum +=
        settings.value.nightBonus *
        (_isOverOrders(baseData.value.nightOrders)
          ? baseData.value.nightOrders
          : baseData.value.orders)
    }

    if (settings.value.isWeatherBonus) {
      sum += baseData.value.orders * settings.value.weatherBonus
    }

    return sum
  })

  const hoursSum = computed(() => baseData.value.hours * singleHourPrice.value)

  const singleHourPrice = computed(() => {
    if (!settings.value) return 0
    let price = isRideOnScooter.value
      ? settings.value.baseHourScooterPrice
      : settings.value.baseHourBicyclePrice
    if (settings.value.isExtraDay) price += settings.value.extraDayBonus
    if (courier.value && courier.value.company.isLastWeekBonus)
      price += courier.value.company.lastWeekBonus

    return price
  })

  const profitForDay = computed(
    () => hoursSum.value + ordersSum.value + baseData.value.tips
  )

  const totalSum = computed(() => {})

  return { profitForDay, baseData }
})
