import { computed } from 'vue'
import { cloneDeep } from 'lodash'
import { ShiftManager } from './ShiftManager'
import { Shift } from './ShiftClass'
import type { Company } from './CompanyClass'

export class CompanyManager {
  // Текущая смена, хранящаяся в localStorage
  private static _currentShift = ShiftManager.getComputedShift()

  static updateCompany(companyData: Partial<Company>) {
    Object.assign(this._currentShift.value.company, companyData)
  }

  static setDefaultCompany() {
    const shift = Shift.getInstance()
    this._currentShift.value.company = cloneDeep(shift.company)
  }

  static setupCompany(companyData: Company) {
    // this.currentCompany = cloneDeep(companyData)
  }

  static getComputedCompany() {
    return computed(() => this._currentShift.value.company)
  }
}
