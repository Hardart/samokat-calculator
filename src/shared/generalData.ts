import { useLocalStorage } from '@vueuse/core'
import { hoursData } from './hoursData'
import { settings } from './localData'
import { ordersData } from './ordersData'

export const resetAllData = () => {
  ordersData.value.orders = 0
  ordersData.value.morningOrders = 0
  ordersData.value.eveningOrders = 0
  ordersData.value.nightOrders = 0
  hoursData.value.hours = 0
  ordersData.value.tips = 0
  settings.value.isExtraWeatherMoney = false
  settings.value.isExtraDay = false
}

export const firstInit = useLocalStorage('init', false) // TODO: must show first information for new user
