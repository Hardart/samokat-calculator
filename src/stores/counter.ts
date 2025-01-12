import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useBaseStore } from './base'
import { useHourStore } from './hours'
import { useOrderStore } from './orders'

export const useCountStore = defineStore('counter', () => {
  const { tips } = storeToRefs(useBaseStore())
  const { hoursSum, hoursSettings } = storeToRefs(useHourStore())
  const { ordersSum, ordersSettings } = storeToRefs(useOrderStore())

  const profitForDay = computed(
    () => hoursSum.value + ordersSum.value + tips.value
  )

  const ratingForDay = computed(() => {
    const rating = ordersSettings.value.orders / hoursSettings.value.hours
    return Number.isNaN(rating) || !Number.isFinite(rating) || !rating
      ? 0
      : Number(rating).toFixed(2)
  })

  return {
    profitForDay,
    ratingForDay,
  }
})
