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

  static incrementPartOfDayOrders = (type: 'morning' | 'evening' | 'night') => {
    if (this._isOrdersGreaterThanSurcharges.value)
      this.shift.value[`${type}Orders`]++
  }

  static decrementPartOfDayOrders = (type: 'morning' | 'evening' | 'night') => {
    if (this.shift.value[`${type}Orders`] > 0)
      this.shift.value[`${type}Orders`]--
  }

  private static get _isOrdersGreaterThanSurcharges() {
    return computed(() => {
      const { orders, morningOrders, nightOrders, eveningOrders } =
        this.shift.value
      const surchargesCount = morningOrders + nightOrders + eveningOrders
      return orders > surchargesCount
    })
  }

  private static get _isOrdersGraterOrEqualSurcharges() {
    return computed(() => {
      const { orders, morningOrders, nightOrders, eveningOrders } =
        this.shift.value
      const surchargesCount = morningOrders + nightOrders + eveningOrders
      return orders >= surchargesCount
    })
  }

  static get isIncreaseDisable() {
    return !this._isOrdersGreaterThanSurcharges.value
  }

  private static get _surchargesTotal() {
    const { settings, morningOrders, nightOrders, eveningOrders } =
      this.shift.value
    const { nightSurcharge, morningSurcharge, eveningSurcharge } = settings

    return (
      morningOrders * morningSurcharge +
      nightOrders * nightSurcharge +
      eveningOrders * eveningSurcharge
    )
  }

  private static get _surcharges() {
    return this._isOrdersGraterOrEqualSurcharges.value
      ? this._surchargesTotal
      : 0
  }

  // Вычисляем заработок текущей смены
  static get getComputedEarnings() {
    return computed(() => {
      if (!this.shift) return 0
      const { orders, tips, hours } = this.shift.value
      const baseEarnings = orders * CostCalculator.singleOrderCost.value
      const hourEarnings = hours * CostCalculator.singleHourCost.value
      const total = baseEarnings + hourEarnings + this._surcharges + tips
      this.shift.value.totalEarnings = total
      return total
    })
  }
}
