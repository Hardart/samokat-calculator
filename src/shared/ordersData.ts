import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { settings } from './localData'

export const ordersData = useLocalStorage('orders', {
  orders: 0,
  tips: 0,
  morningOrders: 0,
  eveningOrders: 0,
  nightOrders: 0,
  EXTRA_MORNING_MONEY: 30,
  EXTRA_EVENING_MONEY: 5,
  EXTRA_NIGHT_MONEY: 70,
  EXTRA_WEATHER_MONEY: 10,
  ORDER_PRICE: 40,
})

const isOverOrders = (someOrders: number) =>
  someOrders <= ordersData.value.orders

export const ordersSum = computed(() => {
  let sum = ordersData.value.orders * ordersData.value.ORDER_PRICE

  if (ordersData.value.morningOrders > 0) {
    sum +=
      ordersData.value.EXTRA_MORNING_MONEY *
      (isOverOrders(ordersData.value.morningOrders)
        ? ordersData.value.morningOrders
        : ordersData.value.orders)
  }

  if (ordersData.value.eveningOrders > 0) {
    sum +=
      ordersData.value.EXTRA_EVENING_MONEY *
      (isOverOrders(ordersData.value.eveningOrders)
        ? ordersData.value.eveningOrders
        : ordersData.value.orders)
  }

  if (ordersData.value.nightOrders > 0) {
    sum +=
      ordersData.value.EXTRA_NIGHT_MONEY *
      (isOverOrders(ordersData.value.nightOrders)
        ? ordersData.value.nightOrders
        : ordersData.value.orders)
  }

  if (settings.value.isExtraWeatherMoney) {
    sum += ordersData.value.orders * ordersData.value.EXTRA_WEATHER_MONEY
  }

  return sum
})
