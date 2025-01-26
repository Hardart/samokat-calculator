import { computed } from 'vue'
import { settings } from './localData'

export type CompanyName = '2 колеса' | 'Альянс' | 'Бриг' | 'Звезда' | 'Изи'

interface Company {
  name: CompanyName
  isRent: boolean
  rentalCost: number
  discountCost: number
  oursForDiscountRent: number
  oursForFreeRent: number
}

export const companyData = () => {
  const companies: Company[] = [
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
    // {
    //   name: 'Бриг',
    //   isRent: true,
    //   rentalCost: 3600,
    //   discountCost: 2500,
    //   oursForDiscountRent: 30,
    //   oursForFreeRent: 60,
    // },
    // {
    //   name: 'Звезда',
    //   isRent: true,
    //   rentalCost: 3600,
    //   discountCost: 2500,
    //   oursForDiscountRent: 30,
    //   oursForFreeRent: 60,
    // },
    {
      name: 'Изи',
      isRent: false,
      rentalCost: 0,
      discountCost: 0,
      oursForDiscountRent: 0,
      oursForFreeRent: 0,
    },
  ]
  const companyNames = computed(() => companies.map((company) => company.name))

  const company = computed(() =>
    companies.find((company) => company.name === settings.value.company)
  )

  return { companies, companyNames, company }
}
