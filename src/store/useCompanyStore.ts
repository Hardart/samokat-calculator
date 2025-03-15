import { ref } from 'vue'
import { defineStore } from 'pinia'
import { companiesAPI } from '@/api/companies-api'
import { type Company } from '@/shared/schemas/company-schema'
import { cloneDeep } from 'lodash'

export const useCompanyStore = defineStore('company', () => {
  const companyTemplate: Company = {
    id: null,
    name: '',
    discountCost: 0,
    rentalCost: 0,
    lastWeekBonusCost: 0,
    hasLastWeekBonus: false,
    hoursForDiscountRent: 0,
    hoursForFreeRent: 0,
    hoursForLastWeekBonus: 0,
  }

  const companies = ref<Company[]>()
  const company = ref<Company>(cloneDeep(companyTemplate))

  async function fetchCompanies() {
    companies.value = await companiesAPI.list()
    return
  }

  async function fetchCompany(companyId: string) {
    const data = await companiesAPI.getById(companyId)
    if (!data) return
    company.value = data
    return
  }

  async function createCompany() {
    if (!company.value) return
    await companiesAPI.create(company.value)
    return
  }

  return {
    companies,
    company,
    fetchCompanies,
    fetchCompany,
    createCompany,
  }
})
