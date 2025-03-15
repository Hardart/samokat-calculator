import type { Settings } from '@/shared/schemas/settings-schema'
import { notNanOrFininte } from '@/shared/utils'
import { useLocalStorage } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import { computed } from 'vue'

export const useGlobalSettings = () => {
  const settingsTemplate: Settings = {
    id: null,
    orderCost: 35,
    hourCost: 120,
    badWeatherSurcharge: 10,
    morningSurcharge: 30,
    eveningSurcharge: 5,
    nightSurcharge: 70,
    extraDaySurcharge: 15,
    extraDays: ['понедельник', 'воскресенье'],
    isRentingTransport: false,
    transportType: 'scooter',
  }

  const globalSettings = useLocalStorage(
    'global-settings',
    cloneDeep(settingsTemplate)
  )

  function deleteGlobalSettings() {
    globalSettings.value = null
  }

  function setGlobalSettings() {
    globalSettings.value = cloneDeep(settingsTemplate)
  }

  return { globalSettings, setGlobalSettings, deleteGlobalSettings }
}
