import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
type Company = '2 колеса' | 'Альянс' | undefined

export const useBaseStore = defineStore('base', () => {
  const company = ref<Company>()
  const tips = ref(0)

  const isShowLastWeekHours = computed(() => company.value === '2 колеса')
  const isOpenSettings = ref(false)

  return {
    isOpenSettings,
    isShowLastWeekHours,
    company,
    tips,
  }
})
