import { computed } from 'vue'
import { ShiftManager } from './ShiftManager'
import type { Settings } from './SettingsClass'
import type { Company } from './CompanyClass'

export class CostCalculator {
  private static shift = ShiftManager.getComputedShift()

  static get singleHourCost() {
    return computed(() => {
      const { settings, company } = this.shift.value
      let hourCost = settings.hourCost
      hourCost += this._addExtraDaySurcharge(settings)
      hourCost += this._lastWeekBonusSurcharge(settings, company)
      return hourCost
    })
  }

  static get singleOrderCost() {
    return computed(() => {
      const { settings } = this.shift.value
      let orderCost = settings.orderCost
      orderCost += this._addWeatherSurcharge(settings)
      return orderCost
    })
  }

  static get rating() {
    return computed(() => {
      const { orders, hours } = this.shift.value
      return this.calcRating(orders, hours)
    })
  }

  static calcRating(orders: number, hours: number) {
    return orders && hours ? Number(orders / hours).toFixed(2) : 0
  }

  private static _addExtraDaySurcharge(settings: Settings) {
    if (!settings.isExtraDay) return 0
    return settings.extraDaySurcharge
  }

  private static _lastWeekBonusSurcharge(settings: Settings, company: Company) {
    if (!settings.isLastWeekHours) return 0
    return company.lastWeekBonus.cost
  }

  private static _addWeatherSurcharge(settings: Settings) {
    if (!settings.isWeatherSurcharge) return 0
    return settings.badWeatherSurcharge
  }
}
