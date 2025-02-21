import { reactive, ref } from 'vue'
import { type Company } from '@/shared/schemas/company-schema'
import { companiesAPI } from '@/api/companies-api'
import { defineStore } from 'pinia'

export const useCompanyStore = defineStore('company', () => {
  const company = ref<Company>()
  const companies = ref<Company[]>()

  async function fetchCompanies() {
    companies.value = await companiesAPI.list()
    return
  }

  async function fetchCompany(companyId: string) {
    company.value = await companiesAPI.getById(companyId)
    return
  }

  return { companies, company, fetchCompanies, fetchCompany }
})
