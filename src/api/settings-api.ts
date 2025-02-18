import type { ResponseApi } from '@/shared/types/ResponseAPI'
import { useHdFetch } from './base-fetch/base-fetch'
import type { Settings } from '@/shared/schemas/settings-schema'
import type { Courier } from '@/shared/schemas/courier-schema'

export const settingsAPI = {
  async getSettings() {
    const { data } = await useHdFetch<ResponseApi.Settings.Global>('/settings')
    return data.value
  },
  async saveSettings(body: Courier) {
    const { data } = await useHdFetch<ResponseApi.Settings.Global>(
      '/settings',
      { method: 'post', body }
    )
    return data.value
  },
}
