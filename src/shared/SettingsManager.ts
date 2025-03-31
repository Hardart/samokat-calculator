import { computed } from 'vue'
import { ShiftManager } from './ShiftManager'
import type { Settings } from './SettingsClass'
import { Shift } from './ShiftClass'
import { cloneDeep } from 'lodash'

export class SettingsManager {
  // Текущая смена, хранящаяся в localStorage
  private static currentShift = ShiftManager.getComputedShift()
  // static currentSettings = this.currentShift.value.settings

  static updateSettings(settingsData: Partial<Settings>) {
    Object.assign(this.currentShift.value.settings, settingsData)
  }

  static setDefaultSettings() {
    const shift = Shift.getInstance()
    this.currentShift.value.settings = cloneDeep(shift.settings)
  }

  // static setupSettings(settingsData: Settings) {
  //   this.currentSettings = cloneDeep(settingsData)
  // }

  static getComputedSettings() {
    return computed(() => this.currentShift.value.settings)
  }
}
