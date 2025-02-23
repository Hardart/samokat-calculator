import { ref } from 'vue'
import { defineStore } from 'pinia'
import { companiesAPI } from '@/api/companies-api'
import { companySchema, type Company } from '@/shared/schemas/company-schema'
import { cloneDeep } from 'lodash'
import { useLocalStorage } from '@vueuse/core'

export const useCompanyStore = defineStore('company', () => {
  const companyTemplate: Company = {
    name: '',
    discountCost: 0,
    rentalCost: 0,
    lastWeekBonusCost: 0,
    hasLastWeekBonus: false,
    hoursForDiscountRent: 0,
    hoursForFreeRent: 0,
    hoursForLastWeekBonus: 0,
  }
  const company = ref<Company>(cloneDeep(companyTemplate))
  const globalCompany = useLocalStorage('company', cloneDeep(companyTemplate))

  const companies = ref<Company[]>()

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

  function setGlobalCompany() {
    globalCompany.value = cloneDeep(companyTemplate)
    company.value = cloneDeep(globalCompany.value)
  }

  function deleteGlobalCompany() {
    globalCompany.value = null
  }

  return {
    companies,
    company,
    globalCompany,
    fetchCompanies,
    fetchCompany,
    createCompany,
    setGlobalCompany,
    deleteGlobalCompany,
  }
})
