type PartOfDay = 'morning' | 'evening' | 'night'

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useCompanyStore } from './useCompanyStore'
import { useSettingsStore } from './useSettingStore'
import type { Shift } from '@/shared/schemas/shift-schema'
import { cloneDeep } from 'lodash'
import { shiftAPI } from '@/api/shift-api'
import { useCourierStore } from './useCourierStore'
import { isToday } from '@/shared/date'

export const useShiftStore = defineStore('shift', () => {
  const settingsStore = useSettingsStore()
  const companyStore = useCompanyStore()
  const courierStore = useCourierStore()

  const shiftTemplate: Shift = {
    date: new Date(),
    hourCost: 0,
    orderCost: 0,
    orders: {
      morning: 0,
      evening: 0,
      night: 0,
      total: 0,
    },
    tips: 0,
    workHours: 0,
    totalEarnings: 0,
    courier: '',
  }

  const loadingShifts = ref(false)

  const shift = ref<Shift>(cloneDeep(shiftTemplate))
  const shifts = ref<Shift[]>([])

  const isShiftSaved = computed(() =>
    shifts.value?.some((shift) => isToday(shift.date))
  )

  const singleOrderCost = computed(() => {
    let orderCost = settingsStore.settings.orderCost
    if (settingsStore.storageSettings.isWeatherSurcharge) {
      orderCost += settingsStore.settings.badWeatherSurcharge
    }
    return orderCost
  })

  const singleHourPrice = computed(() => {
    let price = settingsStore.settings.hourCost
    price += _addExtraDaySurcharge()
    price += _lastWeekBonusSurcharge()
    return price
  })

  const ordersSum = computed(() => {
    let sum = settingsStore.storageSettings.orders * singleOrderCost.value
    const partsOfDay: PartOfDay[] = ['morning', 'evening', 'night']
    partsOfDay.forEach((part) => {
      sum += _partsOfDaySum(part)
    })

    return sum
  })

  const hoursSum = computed(
    () => settingsStore.storageSettings.hours * singleHourPrice.value
  )

  const profitForDay = computed(
    () => hoursSum.value + ordersSum.value + settingsStore.storageSettings.tips
  )

  const lastWeekBonusLabel = computed(
    () => `Отработал ${companyStore.company.hoursForLastWeekBonus}ч. прошлой
                неделе?`
  )

  const extraDaysLabel = computed(
    () => `Сегодня ${settingsStore.settings.extraDays.join(' или ')}?`
  )

  async function saveShift() {
    if (isShiftSaved.value) return
    _setShiftDataFromStorage()
    const data = await shiftAPI.saveShift(shift.value)
    if (!data) return
    shifts.value.push(data)
    settingsStore.resetStorageSettings()
    _resetShift()
  }

  async function getShiftsForWeek(week: number = 0) {
    if (!courierStore.isLogin) return
    loadingShifts.value = true
    const query = _getWeekRange(week)
    const data = await shiftAPI.getShiftsForWeek(
      courierStore.courier.id!,
      query
    )
    loadingShifts.value = false
    if (!data) return
    shifts.value = data
  }

  function _resetShift() {
    shift.value = cloneDeep(shiftTemplate)
  }

  function _setShiftDataFromStorage() {
    if (!courierStore.isLogin) return
    const { storageSettings } = settingsStore
    shift.value.hourCost = singleHourPrice.value
    shift.value.orderCost = singleOrderCost.value
    shift.value.tips = storageSettings.tips
    shift.value.orders.morning = storageSettings.morningOrders
    shift.value.orders.evening = storageSettings.eveningOrders
    shift.value.orders.night = storageSettings.nightOrders
    shift.value.orders.total = storageSettings.orders
    shift.value.workHours = storageSettings.hours
    shift.value.totalEarnings = profitForDay.value
    shift.value.courier = courierStore.courier.id!
  }

  function _lastWeekBonusSurcharge() {
    if (!companyStore.company || !settingsStore.storageSettings.isLastWeekHours)
      return 0
    return companyStore.company.lastWeekBonusCost
  }

  function _addExtraDaySurcharge() {
    if (!settingsStore.storageSettings.isExtraDay) return 0
    return settingsStore.settings.extraDaySurcharge
  }

  function _isOverOrders(someOrders: number) {
    return someOrders <= settingsStore.storageSettings.orders
  }

  function _partsOfDaySum(partOfDay: PartOfDay) {
    if (!settingsStore.storageSettings[`${partOfDay}Orders`]) return 0

    return (
      settingsStore.settings[`${partOfDay}Surcharge`] *
      (_isOverOrders(settingsStore.storageSettings[`${partOfDay}Orders`])
        ? settingsStore.storageSettings[`${partOfDay}Orders`]
        : settingsStore.storageSettings.orders)
    )
  }

  function _getWeekRange(weekShift: number = 0) {
    const now = new Date()
    const day = now.getDay() === 0 ? 7 : now.getDay()
    const setDate = now.getDate() - day + 1 - weekShift * 7

    const startOfWeek = new Date(now.setDate(setDate)) // Понедельник
    const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6)) // Воскресенье
    startOfWeek.setHours(0, 0, 0)
    endOfWeek.setHours(23, 59, 59)

    return {
      startDate: startOfWeek.toISOString(),
      endDate: endOfWeek.toISOString(),
    }
  }

  return {
    shift,
    shifts,
    profitForDay,
    singleHourPrice,
    singleOrderCost,
    lastWeekBonusLabel,
    extraDaysLabel,
    isShiftSaved,
    loadingShifts,
    saveShift,
    getShiftsForWeek,
  }
})
