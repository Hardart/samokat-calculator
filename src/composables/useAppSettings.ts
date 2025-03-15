import { useSettingsStore } from '@/store/useSettingStore'

export const useAppSettings = () => {
  const settingsStore = useSettingsStore()
  const appSettings = settingsStore.localSettings
  return { appSettings }
}
