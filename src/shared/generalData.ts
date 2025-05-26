import { useLocalStorage } from '@vueuse/core'
import { hoursData } from './hoursData'
import { settings } from './localData'
import { ordersData } from './ordersData'

export const resetAllData = () => {
  const ordersKeys = Object.keys(
    ordersData.value
  ) as (keyof typeof ordersData.value)[]
  ordersKeys.forEach((key) => {
    ordersData.value[key] = 0
  })
  hoursData.value.hours = 0
  settings.value.isExtraWeatherMoney = false
  settings.value.isExtraDay = false
}

export const firstInit = useLocalStorage('init', false) // TODO: must show first information for new user
export const updates = useLocalStorage('updates', true) // TODO: must show first information for new user
export const changeUpdatesState = () => (updates.value = !updates.value)
