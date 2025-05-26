import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { settings } from './localData'

const EXTRA_WEATHER_MONEY = 10
const EXTRA_MONEY = {
  morning: 30,
  evening: 30,
  night: 70,
  heavy: 50,
}
const ORDER_PRICE = 25

export const ordersData = useLocalStorage('orders', {
  orders: 0,
  tips: 0,
  morningOrders: 0,
  eveningOrders: 0,
  nightOrders: 0,
  heavyOrders: 0,
})

const keys = Object.keys(EXTRA_MONEY) as (keyof typeof EXTRA_MONEY)[]

function isOverOrders(key: keyof typeof ordersData.value) {
  return ordersData.value[key] <= ordersData.value.orders
}

export const ordersSum = computed(() => {
  let sum = ordersData.value.orders * ORDER_PRICE //стандартная сумма заказов

  keys.forEach((key) => {
    const orderKey = `${key}Orders` as keyof typeof ordersData.value
    if (ordersData.value[orderKey] > 0) {
      const isOverOrdersValue = isOverOrders(orderKey)
        ? ordersData.value[orderKey]
        : ordersData.value.orders

      sum += EXTRA_MONEY[key] * isOverOrdersValue //сумма заказов с экстра надбавками
    }
  })

  if (settings.value.isExtraWeatherMoney) {
    sum += ordersData.value.orders * EXTRA_WEATHER_MONEY //сумма заказов с экстра надбавкой погоды
  }

  return sum
})
