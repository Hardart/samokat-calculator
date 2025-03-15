type PartOfDay = 'morning' | 'evening' | 'night'
import { useSettingsStore } from '@/store/useSettingStore'
import { computed } from 'vue'

export const useUserSettings = () => {
  const settingsStore = useSettingsStore()

  const isExtraDaysExist = computed(
    () => settingsStore.settings.extraDays.length
  )
  return { userSettings: settingsStore.settings, isExtraDaysExist }
}
