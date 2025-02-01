import { computed } from 'vue'
import { settings } from './localData'

export type CompanyName = '2 колеса' | 'Альянс' | 'Бриг' | 'Звезда' | 'Изи'

interface Company {
  name: CompanyName
  isRent: boolean
  rentalCost: number
  discountCost: number
  hoursForDiscountRent: number
  hoursForFreeRent: number
  hoursForLastWeekBonus?: number
  isLastWeekBonus: boolean
  hourBonus: number
}

export const companyData = () => {
  const companies: Company[] = [
    {
      name: '2 колеса',
      isRent: true,
      rentalCost: 2375,
      discountCost: 1188,
      hoursForDiscountRent: 60,
      hoursForFreeRent: 71,
      hourBonus: 5,
      hoursForLastWeekBonus: 30,
      isLastWeekBonus: true,
    },
    {
      name: 'Альянс',
      isRent: true,
      rentalCost: 3600,
      discountCost: 2500,
      hoursForDiscountRent: 60,
      hoursForFreeRent: 75,
      hourBonus: 0,
      hoursForLastWeekBonus: 50,
      isLastWeekBonus: true,
    },
    {
      name: 'Изи',
      isRent: false,
      rentalCost: 0,
      discountCost: 0,
      hoursForDiscountRent: 0,
      hoursForFreeRent: 0,
      hourBonus: 0,
      isLastWeekBonus: false,
    },
  ]
  const companyNames = computed(() => companies.map((company) => company.name))

  const company = computed(() =>
    companies.find((company) => company.name === settings.value.company)
  )

  return { companies, companyNames, company }
}
