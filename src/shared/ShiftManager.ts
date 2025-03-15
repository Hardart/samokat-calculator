import { computed, unref, type MaybeRef } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import { Shift } from './ShiftClass'

export class ShiftManager {
  // Текущая смена, хранящаяся в localStorage
  static currentShift = useLocalStorage<Shift>(
    'currentShift',
    Shift.getInstance()
  )

  static resetCurrentShift = () => {
    const shift = Shift.getInstance()
    this.currentShift.value = cloneDeep(shift)
  }

  // Добавить новую смену
  static addShift(shift: Shift, shiftList: Shift[]) {
    shiftList.push(shift)
  }

  // Найти смену по дате
  static findShift(date: string, shiftList: Shift[]): Shift | undefined {
    return shiftList.find((shift) => shift.date === date)
  }

  // Обновить данные смены
  static updateShift(
    date: string,
    shiftList: Shift[],
    updatedData: Partial<Shift>
  ) {
    const shift = this.findShift(date, shiftList)
    if (!shift) throw new Error('Shift not found')

    // Обновляем смену в массиве
    Object.assign(shift, updatedData)

    // Обновляем текущую смену в localStorage, если она совпадает
    if (this.currentShift.value && this.currentShift.value.date === date) {
      Object.assign(this.currentShift.value, updatedData)
    }
  }

  // Выбрать смену для работы
  static selectShift(date: string, shiftList: Shift[]) {
    const shift = this.findShift(date, shiftList)
    if (!shift) throw new Error('Shift not found')
    this.currentShift.value = shift
  }

  //Сохранена ли смена
  static isPeriodSaved(shiftList: MaybeRef<Shift[]>) {
    const shift = ShiftManager.getComputedShift().value
    shiftList = unref(shiftList)
    return shiftList.some((shiftitem) => shift.id && shiftitem.id === shift.id)
  }

  // Получить текущую смену
  static getCurrentShift(): Shift {
    if (!this.currentShift.value) throw new Error('No current shift selected')
    return this.currentShift.value
  }

  static getComputedShift() {
    return computed(() => this.getCurrentShift())
  }

  static getComutedSettings() {
    return computed(() => this.currentShift.value.settings)
  }
}
