import type { ResponseApi } from '@/shared/types/ResponseAPI'
import type { Shift } from '@/shared/schemas/shift-schema'
import { useHdFetch } from './base-fetch/base-fetch'

export const shiftAPI = {
  async saveShift(body: Shift) {
    const { data } = await useHdFetch<ResponseApi.ShiftData.Single>('/shifts', {
      method: 'post',
      body,
    })
    return data.value
  },
  async getShiftsForWeek(courierId: string, query: object) {
    const { data } = await useHdFetch<ResponseApi.ShiftData.List>(
      '/shifts/' + courierId,
      { query }
    )
    return data.value
  },
}
