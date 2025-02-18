import { z } from 'zod'

export type Company = z.output<typeof companySchema>

export const defaultCompany = {
  name: '',
  hasRent: false,
  hasLastWeekBonus: false,
  hoursForFreeRent: 0,
  hoursForDiscountRent: 0,
  hoursForLastWeekBonus: 0,
  rentalCost: 0,
  discountCost: 0,
  lastWeekBonusCost: 0,
}

export const companySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  hasRent: z.boolean(),
  hasLastWeekBonus: z.boolean(),
  lastWeekBonusCost: z.number(),
  rentalCost: z.number(),
  hoursForDiscountRent: z.number(),
  discountCost: z.number(),
  hoursForFreeRent: z.number(),
  hoursForLastWeekBonus: z.number(),
})
