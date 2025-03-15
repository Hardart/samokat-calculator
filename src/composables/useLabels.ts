import { computed } from 'vue'
import { useNewShiftStore } from '@/store/useNewShiftStore'
import { ShiftManager } from '@/shared/ShiftManager'

export const useLabels = () => {
  const shiftStore = useNewShiftStore()
  const shift = ShiftManager.getComputedShift()
  const settings = ShiftManager.getComutedSettings()

  const lastWeekBonusLabel = computed(() => {
    return `Отработал ${shift.value.company.lastWeekBonus.hours}ч. прошлой
                  неделе?`
  })

  const extraDaysLabel = computed(() => {
    return `Сегодня ${settings.value.extraDays.join(' или ')}?`
  })

  const saveButtonLabel = computed(() => {
    return !shiftStore.shifts.length
      ? 'Загрузка'
      : shiftStore.isShiftSaved
      ? 'Сохранено'
      : 'Сохранить'
  })

  return { lastWeekBonusLabel, extraDaysLabel, saveButtonLabel }
}
