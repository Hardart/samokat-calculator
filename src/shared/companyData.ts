import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'

export type CompanyName = '2 колеса' | 'Альянс' | 'Бриг' | 'Звезда'

interface Company {
  name: CompanyName
  isRent: boolean
  rentalCost: number
  discountCost: number
  oursForDiscountRent: number
  oursForFreeRent: number
}

export const companyData = () => {
  const companies = useLocalStorage<Company[]>('companies', [
    {
      name: '2 колеса',
      isRent: true,
      rentalCost: 2375,
      discountCost: 1188,
      oursForDiscountRent: 60,
      oursForFreeRent: 71,
    },
    {
      name: 'Альянс',
      isRent: true,
      rentalCost: 3600,
      discountCost: 2500,
      oursForDiscountRent: 60,
      oursForFreeRent: 75,
    },
    {
      name: 'Бриг',
      isRent: true,
      rentalCost: 3600,
      discountCost: 2500,
      oursForDiscountRent: 30,
      oursForFreeRent: 60,
    },
    {
      name: 'Звезда',
      isRent: true,
      rentalCost: 3600,
      discountCost: 2500,
      oursForDiscountRent: 30,
      oursForFreeRent: 60,
    },
  ])
  const companyNames = computed(() =>
    companies.value.map((company) => company.name)
  )
  const myCompany = (companyName?: CompanyName) =>
    companies.value.find((company) => company.name === companyName)

  return { companies, companyNames, myCompany }
}
