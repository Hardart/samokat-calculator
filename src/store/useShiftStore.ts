import type { Shift } from '@/shared/schemas/shift-schema'
import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { shiftAPI } from '@/api/shift-api'
import { useCourierStore } from './useCourierStore'
import { _getMonthAndYear, isToday } from '@/shared/date'

import { useCostInfo } from '@/composables/useCostInfo'
import { useUser } from '@/composables/useUser'
import { useStorageSettings } from '@/composables/useStorageSettings'

export const useShiftStore = defineStore('shift', () => {
  const courierStore = useCourierStore()
  const { storage, resetStorageSettings } = useStorageSettings()
  const { isLogin } = useUser()

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
  const range = reactive({
    weekOffset: 0,
    monthOffset: 0,
  })

  const periodType = ref<'week' | 'month' | null>('week')

  const shift = ref<Shift>(cloneDeep(shiftTemplate))
  const shifts = ref<Shift[]>([])

  const isShiftSaved = computed(() =>
    shifts.value?.some((shift) => isToday(shift.date))
  )

  const isSaveButtonDisabled = computed(
    () => isShiftSaved.value || loadingShifts.value
  )

  async function saveShift() {
    if (isShiftSaved.value) return
    _setShiftDataFromStorage()
    const data = await shiftAPI.saveShift(shift.value)
    if (!data) return
    shifts.value.push(data)
    resetStorageSettings()
    _resetShift()
  }

  async function fetchShifts(courierId: string) {
    loadingShifts.value = true
    const data = await shiftAPI.getShifts(courierId)
    loadingShifts.value = false
    return data
  }

  async function getShiftsList() {
    if (!isLogin.value) return
    shifts.value = await fetchShifts(courierStore.courier.id!)
  }

  function changeOffset(isIncrease: boolean) {
    isIncrease ? range.weekOffset++ : range.weekOffset--
    if (range.weekOffset < 0) range.weekOffset = 0
  }

  function _resetShift() {
    shift.value = cloneDeep(shiftTemplate)
  }

  function _setShiftDataFromStorage() {
    if (!isLogin.value) return
    const { singleHourCost, singleOrderCost, totalEarnings } = useCostInfo()
    shift.value.hourCost = singleHourCost.value
    shift.value.orderCost = singleOrderCost.value
    shift.value.tips = storage.value.tips
    shift.value.orders.morning = storage.value.morningOrders
    shift.value.orders.evening = storage.value.eveningOrders
    shift.value.orders.night = storage.value.nightOrders
    shift.value.orders.total = storage.value.orders
    shift.value.workHours = storage.value.hours
    shift.value.totalEarnings = totalEarnings.value
    shift.value.courier = courierStore.courier.id!
  }

  return {
    shift,
    shifts,
    range,
    isShiftSaved,
    loadingShifts,
    periodType,
    isSaveButtonDisabled,
    saveShift,
    getShiftsList,
    changeOffset,
  }
})
