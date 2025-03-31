import { shiftAPI } from '@/api/shift-api'
import { useUser } from '@/composables/useUser'
import type { ZShift } from '@/shared/schemas/shift-schema'
import { type Shift } from '@/shared/ShiftClass'
import { ShiftManager } from '@/shared/ShiftManager'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useNewShiftStore = defineStore('shift-store', () => {
  const shifts = ref<ZShift[]>([])
  const loadingShifts = ref(false)
  const range = reactive({
    weekOffset: 0,
    monthOffset: 0,
  })

  const isShiftSaved = computed(() => ShiftManager.isPeriodSaved(shifts.value))
  const periodType = ref<'week' | 'month' | null>('week')

  async function fetchShifts(courierId: string) {
    loadingShifts.value = true
    const data = await shiftAPI.getShifts(courierId)
    loadingShifts.value = false
    shifts.value = data
    return
  }

  async function preloadShifts() {
    const { isLogin, courier } = useUser()
    if (!isLogin.value) return
    fetchShifts(courier.value.id!)
  }

  function addShift(shift: Shift) {
    const { isLogin, courier } = useUser()
    if (!isLogin.value) return
  }

  async function deleteShift(shiftId: string) {
    const data = await shiftAPI.deleteShift(shiftId)
    if (!data) return console.error('Can"t delete shift')
    ShiftManager.deleteShift(shiftId, shifts)
  }

  function resetShift() {
    ShiftManager.resetCurrentShift()
  }

  function findShift(shiftId: string) {
    return ShiftManager.findShiftById(shiftId, shifts.value)
  }

  async function saveShift() {
    if (isShiftSaved.value) return
    const { isLogin, courier } = useUser()
    if (!isLogin.value) return
    const zShift = ShiftManager.addShift(courier.value.id!)
    const zShiftWithId = await shiftAPI.saveShift(zShift)
    if (!zShiftWithId) return
    shifts.value.unshift(zShiftWithId)
    ShiftManager.resetCurrentShift()
  }

  function changeOffset(isIncrease: boolean) {
    isIncrease ? range.weekOffset++ : range.weekOffset--
    if (range.weekOffset < 0) range.weekOffset = 0
  }

  return {
    shifts,
    isShiftSaved,
    periodType,
    range,
    loadingShifts,
    fetchShifts,
    addShift,
    deleteShift,
    changeOffset,
    preloadShifts,
    saveShift,
    resetShift,
    findShift,
  }
})
