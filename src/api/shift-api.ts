import type { ResponseApi } from '@/shared/types/ResponseAPI'

import { useHdFetch } from './base-fetch/base-fetch'
import type { ZShift } from '@/shared/schemas/shift-schema'

export const shiftAPI = {
  async saveShift(body: ZShift) {
    const { data } = await useHdFetch<ResponseApi.ShiftData.Single>('/shifts', {
      method: 'post',
      body,
    })
    return data.value
  },
  async getShifts(courierId: string) {
    const { data } = await useHdFetch<ResponseApi.ShiftData.List>(
      '/shifts/' + courierId
    )
    return data.value || []
  },
  async deleteShift(shiftId: string) {
    const { data } = await useHdFetch<ResponseApi.ShiftData.Single>(
      '/shifts/' + shiftId,
      { method: 'delete' }
    )
    return data.value
  },
}
