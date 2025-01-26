import { v4 as uuid } from 'uuid'
import { computed, ref } from 'vue'
import { isInPeriod, weekRange } from './utils'
import { useLocalStorage, useToggle } from '@vueuse/core'
import { ordersData, ordersSum } from './ordersData'
import { hoursData, hoursSum } from './hoursData'
import { settings } from './localData'
import { resetAllData } from './generalData'
import { today } from './date'

export interface Shift {
  id: string
  date: Date
  orders: number
  morningOrders: number
  eveningOrders: number
  nightOrders: number
  hours: number
  tips: number
  isWeather: boolean
  isExtraDay: boolean
  profit: number
}

export const shift: Shift = {
  id: uuid(),
  date: today,
  orders: 0,
  hours: 0,
  morningOrders: 0,
  eveningOrders: 0,
  nightOrders: 0,
  tips: 0,
  isWeather: false,
  isExtraDay: false,
  profit: 0,
}

export const shifts = useLocalStorage<Shift[]>('shifts', [], { deep: true })

export const shiftsForPeriod = computed(() =>
  shifts.value.filter((shift) => isInPeriod(shift.date))
)

const isDatesEqual = (date: Date | string, localeDate: Date) =>
  new Date(date).toLocaleDateString() == localeDate.toLocaleDateString()

const isDateInShifts = (localeDate: Date) => {
  if (shiftsForPeriod.value.length) {
    return !shiftsForPeriod.value.some((shiftItem) =>
      isDatesEqual(shiftItem.date, localeDate)
    )
  } else {
    return true
  }
}

const notToday = (localeDate: Date) =>
  localeDate.toLocaleDateString() !== today.toLocaleDateString()

export const datesForPeriod = computed(() => {
  const missed: Date[] = []
  for (let i = 0; i < 7; i++) {
    const startDay = new Date(weekRange.value.startDate)
    startDay.setDate(startDay.getDate() + i)
    const shiftDate = new Date(startDay)

    missed.push(shiftDate)
  }
  return missed.filter(isDateInShifts).filter(notToday)
})

export const shiftsTotal = computed(() =>
  shifts.value.reduce(
    (acc, curr) => {
      if (!isInPeriod(curr.date)) return acc
      acc.hours += curr.hours
      acc.profit += curr.profit
      acc.tips += curr.tips
      acc.orders += curr.orders

      return acc
    },
    { hours: 0, orders: 0, profit: 0, tips: 0 } as Shift
  )
)

export const isShiftSaved = computed(() =>
  shifts.value.some((item) => {
    if (item.date)
      return (
        new Date(item.date).toLocaleDateString() === today.toLocaleDateString()
      )
    return false
  })
)

export let shiftToEdit: Shift | undefined

export const findShiftToEdit = (id: string) => {
  shiftToEdit = shifts.value.find((item) => item.id === id)
}

export const deleteShift = (id: string) =>
  (shifts.value = shifts.value.filter((item) => item.id !== id))

export const [isEditShift, toggleEditShift] = useToggle()

export const profitForDay = computed(
  () => hoursSum.value + ordersSum.value + ordersData.value.tips
)

const setShiftFromInputsData = (includeDate: boolean = false) => {
  if (includeDate) shift.date = today
  shift.orders = ordersData.value.orders
  shift.morningOrders = ordersData.value.morningOrders
  shift.eveningOrders = ordersData.value.eveningOrders
  shift.nightOrders = ordersData.value.nightOrders
  shift.hours = hoursData.value.hours
  shift.tips = ordersData.value.tips
  shift.isWeather = settings.value.isExtraWeatherMoney
  shift.isExtraDay = settings.value.isExtraDay
  shift.profit = profitForDay.value
}

const setShiftForEditFromInputsData = () => {
  if (!shiftToEdit) return
  shiftToEdit.orders = ordersData.value.orders
  shiftToEdit.morningOrders = ordersData.value.morningOrders
  shiftToEdit.eveningOrders = ordersData.value.eveningOrders
  shiftToEdit.nightOrders = ordersData.value.nightOrders
  shiftToEdit.hours = hoursData.value.hours
  shiftToEdit.tips = ordersData.value.tips
  shiftToEdit.isWeather = settings.value.isExtraWeatherMoney
  shiftToEdit.isExtraDay = settings.value.isExtraDay
  shiftToEdit.profit = profitForDay.value
}

export const saveShift = () => {
  setShiftFromInputsData(true)
  shifts.value.push(shift)
  resetAllData()
}

export const editShift = () => {
  setShiftForEditFromInputsData()
  cancelEditShift()
}

export const cancelEditShift = () => {
  toggleEditShift()
  resetAllData()
}

export const toggleEditShiftMode = (shiftItem: Shift) => {
  toggleEditShift(true)
  ordersData.value.orders = shiftItem.orders
  hoursData.value.hours = shiftItem.hours
  ordersData.value.morningOrders = shiftItem.morningOrders
  ordersData.value.eveningOrders = shiftItem.eveningOrders
  ordersData.value.nightOrders = shiftItem.nightOrders
  ordersData.value.tips = shiftItem.tips
  settings.value.isExtraWeatherMoney = shiftItem.isWeather
  settings.value.isExtraDay = shiftItem.isExtraDay
  settings.value.isOpenStatistic = false
  findShiftToEdit(shiftItem.id)
}

export const showMissedDates = ref(false)
