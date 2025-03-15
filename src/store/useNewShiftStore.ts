import { shiftAPI } from '@/api/shift-api'
import { type Shift } from '@/shared/ShiftClass'
import { ShiftManager } from '@/shared/ShiftManager'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useNewShiftStore = defineStore('shift-store', () => {
  const shifts = ref<Shift[]>([])

  const isShiftSaved = computed(() => ShiftManager.isPeriodSaved(shifts))

  async function fetchShifts(courierId: string) {
    const data = await shiftAPI.getShifts(courierId)
    shifts.value = data
    return
  }

  function addShift() {
    const shift = ShiftManager.getCurrentShift()
    ShiftManager.addShift(shift, shifts.value)
    ShiftManager.resetCurrentShift()
  }

  return { fetchShifts, addShift, shifts, isShiftSaved }
})
