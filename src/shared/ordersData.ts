import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { settings } from './localData'

const EXTRA_MORNING_MONEY = 30
const EXTRA_EVENING_MONEY = 5
const EXTRA_NIGHT_MONEY = 70
const EXTRA_WEATHER_MONEY = 10
const ORDER_PRICE = 35

export const ordersData = useLocalStorage('orders', {
  orders: 0,
  tips: 0,
  morningOrders: 0,
  eveningOrders: 0,
  nightOrders: 0,
})

const isOverOrders = (someOrders: number) =>
  someOrders <= ordersData.value.orders

export const ordersSum = computed(() => {
  let sum = ordersData.value.orders * ORDER_PRICE

  if (ordersData.value.morningOrders > 0) {
    sum +=
      EXTRA_MORNING_MONEY *
      (isOverOrders(ordersData.value.morningOrders)
        ? ordersData.value.morningOrders
        : ordersData.value.orders)
  }

  if (ordersData.value.eveningOrders > 0) {
    sum +=
      EXTRA_EVENING_MONEY *
      (isOverOrders(ordersData.value.eveningOrders)
        ? ordersData.value.eveningOrders
        : ordersData.value.orders)
  }

  if (ordersData.value.nightOrders > 0) {
    sum +=
      EXTRA_NIGHT_MONEY *
      (isOverOrders(ordersData.value.nightOrders)
        ? ordersData.value.nightOrders
        : ordersData.value.orders)
  }

  if (settings.value.isExtraWeatherMoney) {
    sum += ordersData.value.orders * EXTRA_WEATHER_MONEY
  }

  return sum
})
