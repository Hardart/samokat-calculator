import { computed } from 'vue'
import { ShiftManager } from './ShiftManager'
import { CostCalculator } from './CostCalculator'

export class ShiftCalculator {
  private static shift = ShiftManager.getComputedShift()

  // Методы для обновления данных текущей смены
  static incrementHours = () => {
    this.shift.value.hours++
  }

  static decrementHours = () => {
    if (this.shift.value.hours > 0) this.shift.value.hours--
  }

  static incrementOrders = () => {
    this.shift.value.orders++
  }

  static decrementOrders = () => {
    if (this.shift.value.orders > 0) this.shift.value.orders--
  }

  static incrementMorningOrders = () => {
    if (this.isOrdersGreaterThanSurcharges.value)
      this.shift.value.morningOrders++
  }

  static decrementMorningOrders = () => {
    if (this.shift.value.morningOrders > 0) this.shift.value.morningOrders--
  }

  static incrementNightOrders = () => {
    if (this.isOrdersGreaterThanSurcharges.value) this.shift.value.nightOrders++
  }

  static decrementNightOrders = () => {
    if (this.shift.value.nightOrders > 0) this.shift.value.nightOrders--
  }

  private static get isOrdersGreaterThanSurcharges() {
    return computed(() => {
      const { orders, morningOrders, nightOrders } = this.shift.value
      const surchargesCount = morningOrders + nightOrders
      return orders > surchargesCount
    })
  }

  private static get isOrdersGraterOrEqualSurcharges() {
    return computed(() => {
      const { orders, morningOrders, nightOrders } = this.shift.value
      const surchargesCount = morningOrders + nightOrders
      return orders >= surchargesCount
    })
  }

  static get isIncreaseDisable() {
    return !this.isOrdersGreaterThanSurcharges.value
  }

  private static get surchargesTotal() {
    const { settings, morningOrders, nightOrders } = this.shift.value
    return (
      morningOrders * settings.morningSurcharge +
      nightOrders * settings.nightSurcharge
    )
  }

  private static get surcharge() {
    return this.isOrdersGraterOrEqualSurcharges.value ? this.surchargesTotal : 0
  }

  // Вычисляем заработок текущей смены
  static get getComputedEarnings() {
    return computed(() => {
      if (!this.shift) return 0
      const { orders, tips, hours } = this.shift.value
      const baseEarnings = orders * CostCalculator.singleOrderCost.value
      const hourEarnings = hours * CostCalculator.singleHourCost.value
      return baseEarnings + hourEarnings + this.surcharge + tips
    })
  }
}
