import { useHdFetch } from '@/api/base-fetch/base-fetch'
import type { Company } from '@/shared/schemas/company-schema'
import type { ResponseApi } from '@/shared/types/ResponseAPI'

export const companiesAPI = {
  async list() {
    const { data } = await useHdFetch<ResponseApi.CompanyData.List>(
      '/companies'
    )

    return data.value
  },

  async getById(id: string) {
    const { data } = await useHdFetch<ResponseApi.CompanyData.Single>(
      '/companies/' + id
    )

    return data.value
  },
  async create(body: Company) {
    const { data } = await useHdFetch<ResponseApi.CompanyData.Single>(
      '/companies/',
      { method: 'POST', body }
    )

    return data.value
  },
}
