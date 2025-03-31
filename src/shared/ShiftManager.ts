import { computed, unref, type MaybeRef, type Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import { Shift } from './ShiftClass'
import type { ZShift } from './schemas/shift-schema'
import { isDatesEqual } from './date'

export class ShiftManager {
  // Текущая смена, хранящаяся в localStorage
  static currentShift = useLocalStorage<Shift>(
    'currentShift',
    Shift.getInstance()
  )

  static resetCurrentShift = () => {
    const shift = Shift.getInstance()
    const company = cloneDeep(this.currentShift.value.company)
    const settings = cloneDeep(this.currentShift.value.settings)
    this.currentShift.value = cloneDeep(shift)
    this.currentShift.value.company = company
    this.currentShift.value.settings = settings
  }

  // Добавить новую смену
  static addShift(courierId: string): ZShift {
    const shift = ShiftManager.getComputedShift()
    return this.transformShiftToZodModel(shift.value, courierId)
  }

  // Найти смену по ID
  static findShiftById(
    shiftId: string,
    shiftList: ZShift[]
  ): ZShift | undefined {
    return shiftList.find((shift) => shift.id === shiftId)
  }

  // Найти смену по дате
  static findShiftByDate(
    shiftDate: Date,
    shiftList: ZShift[]
  ): ZShift | undefined {
    return shiftList.find((shift) => isDatesEqual(shift.date, shiftDate))
  }

  // Удалить смену по Id
  static deleteShift(shiftId: string, shiftList: Ref<ZShift[]>): void {
    shiftList.value = shiftList.value.filter((shift) => shift.id !== shiftId)
    return
  }

  // Обновить данные смены
  static updateShift(
    shiftId: string,
    shiftList: ZShift[],
    updatedData: Partial<Shift>
  ) {
    const shift = this.findShiftById(shiftId, shiftList)
    if (!shift) throw new Error('Shift not found')

    // Обновляем смену в массиве
    Object.assign(shift, updatedData)

    // // Обновляем текущую смену в localStorage, если она совпадает
    // if (
    //   this.currentShift.value &&
    //   this.currentShift.value
    // ) {
    //   Object.assign(this.currentShift.value, updatedData)
    // }
  }

  // Выбрать смену для работы
  static selectShift(shiftId: string, shiftList: ZShift[]) {
    const shift = this.findShiftById(shiftId, shiftList)
    if (!shift) throw new Error('Shift not found')
    return shift
  }

  //Сохранена ли смена
  static isPeriodSaved(shiftList: MaybeRef<ZShift[]>) {
    shiftList = unref(shiftList)
    const shift = this.findShiftByDate(new Date(), shiftList)
    return shift ? true : false
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

  static transformShiftToZodModel(shift: Shift, courierId: string): ZShift {
    return {
      courier: courierId,
      morningOrders: shift.morningOrders,
      eveningOrders: shift.eveningOrders,
      nightOrders: shift.nightOrders,
      hourCost: shift.settings.hourCost,
      orderCost: shift.settings.orderCost,
      orders: shift.orders,
      hours: shift.hours,
      tips: shift.tips,
      totalEarnings: shift.totalEarnings,
      date: new Date(),
    }
  }
}
