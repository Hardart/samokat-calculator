import { ref, computed, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useSettingsStore } from './settings'
import { useLocalStorage } from '@vueuse/core'

export const useOrderStore = defineStore('order', () => {
  const { settings } = storeToRefs(useSettingsStore())

  const EXTRA_MORNING_MONEY = 30
  const EXTRA_EVENING_MONEY = 5
  const EXTRA_NIGHT_MONEY = 70
  const EXTRA_WEATHER_MONEY = 10

  const ordersSettings = useLocalStorage('orders', {
    orders: 0,
    morningOrders: 0,
    eveningOrders: 0,
    nightOrders: 0,
  })

  const singleOrderPrice = ref(40)

  const isOverOrders = (someOrders: number) =>
    someOrders <= ordersSettings.value.orders

  const ordersSum = computed(() => {
    let sum = ordersSettings.value.orders * singleOrderPrice.value

    if (ordersSettings.value.morningOrders > 0) {
      sum +=
        EXTRA_MORNING_MONEY *
        (isOverOrders(ordersSettings.value.morningOrders)
          ? ordersSettings.value.morningOrders
          : ordersSettings.value.orders)
    }

    if (ordersSettings.value.eveningOrders > 0) {
      sum +=
        EXTRA_EVENING_MONEY *
        (isOverOrders(ordersSettings.value.eveningOrders)
          ? ordersSettings.value.eveningOrders
          : ordersSettings.value.orders)
    }

    if (ordersSettings.value.nightOrders > 0) {
      sum +=
        EXTRA_NIGHT_MONEY *
        (isOverOrders(ordersSettings.value.nightOrders)
          ? ordersSettings.value.nightOrders
          : ordersSettings.value.orders)
    }

    if (settings.value.isExtraWeatherMoney) {
      sum += ordersSettings.value.orders * EXTRA_WEATHER_MONEY
    }

    return sum
  })

  return { ordersSum, ordersSettings }
})
