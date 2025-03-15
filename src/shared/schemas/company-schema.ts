import { z } from 'zod'

export type Company = z.output<typeof companySchema>

export const defaultCompany: Company = {
  id: null,
  name: '',
  hasLastWeekBonus: false,
  hoursForFreeRent: 0,
  hoursForDiscountRent: 0,
  hoursForLastWeekBonus: 0,
  rentalCost: 0,
  discountCost: 0,
  lastWeekBonusCost: 0,
}

export const companySchema = z.object({
  id: z.string().nullable(),
  name: z.string().trim().min(3, 'Название должно быть не меньше 3 символов'),
  hasLastWeekBonus: z.boolean(),
  lastWeekBonusCost: z.number(),
  rentalCost: z.number().min(10, 'Стоимость аренды должна быть больше 10'),
  hoursForDiscountRent: z.number(),
  discountCost: z.number(),
  hoursForFreeRent: z.number(),
  hoursForLastWeekBonus: z.number(),
})
