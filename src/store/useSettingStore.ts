import { settingsAPI } from '@/api/settings-api'

import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Settings } from '@/shared/schemas/settings-schema'
import { type Company } from '@/shared/schemas/company-schema'
import { companiesAPI } from '@/api/companies-api'
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>()
  const companies = ref<Company[]>()

  const localSettings = reactive({
    isSettingsOpen: false,
  })

  const storageSettings = useLocalStorage('settings', {
    isWeatherSurecharge: false,
    isLastWeekHours: false,
  })

  async function fetchSettings() {
    settings.value = await settingsAPI.getSettings()
    companies.value = await companiesAPI.list()
    if (!settings.value) return

    return
  }

  return { settings, companies, localSettings, storageSettings, fetchSettings }
})
