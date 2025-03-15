import type { Settings } from '@/shared/schemas/settings-schema'
import type { StorageSettings } from '@/shared/types/storageSettings'
import { notNanOrFininte } from '@/shared/utils'
import { useLocalStorage } from '@vueuse/core'
import { cloneDeep } from 'lodash'
import { computed } from 'vue'

export const useStorageSettings = () => {
  const localTemlate = {
    isWeatherSurcharge: false,
    isLastWeekHours: false,
    isExtraDay: false,
    hours: 0,
    orders: 0,
    tips: 0,
    morningOrders: 0,
    eveningOrders: 0,
    nightOrders: 0,
  }

  const storage = useLocalStorage<StorageSettings>(
    'storage-settings',
    cloneDeep(localTemlate)
  )

  const dayRating = computed(() => {
    const rating = storage.value.orders / storage.value.hours
    return notNanOrFininte(rating) ? 0 : Number(rating).toFixed(2)
  })

  const partsOfDayCountSum = computed(
    () =>
      storage.value.morningOrders +
      storage.value.eveningOrders +
      storage.value.nightOrders
  )

  function resetStorageSettings() {
    storage.value = cloneDeep(localTemlate)
  }

  function resetPartsOfDayOrders() {
    storage.value.morningOrders = 0
    storage.value.eveningOrders = 0
    storage.value.nightOrders = 0
  }

  function setStorageSettings(data: StorageSettings) {
    storage.value = cloneDeep(data)
  }

  return {
    dayRating,
    storage,
    partsOfDayCountSum,
    resetStorageSettings,
    resetPartsOfDayOrders,
    setStorageSettings,
  }
}
