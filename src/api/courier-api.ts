import { useHdFetch } from '@/api/base-fetch/base-fetch'
import type { Courier, CourierForm } from '@/shared/schemas/courier-schema'
import type { ResponseApi } from '@/shared/types/ResponseAPI'

export const courierAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.CompanyData.List>('/couriers')
    return data.value
  },

  async findOne(body: { phone: string; password: string }) {
    const { data } = await useHdFetch<ResponseApi.CourierData.Single>(
      `/couriers`,
      { method: 'POST', body }
    )

    return data.value
  },
  async logout(id: string) {
    const { data } = await useHdFetch<ResponseApi.CourierData.Logout>(
      `/couriers/${id}`,
      { method: 'POST' }
    )
    return data.value
  },
  async registration(body: CourierForm) {
    const { data } = await useHdFetch<ResponseApi.CourierData.Single>(
      `/couriers/create`,
      { method: 'POST', body }
    )

    return data.value
  },
  async autoLogin() {
    const { data, error } = await useHdFetch<ResponseApi.CourierData.Single>(
      `/couriers/login`
    )
    if (error.value) {
      return null
    }
    return data.value
  },
}
