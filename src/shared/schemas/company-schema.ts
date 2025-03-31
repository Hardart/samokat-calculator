import { z } from 'zod'

export type Company = z.output<typeof companySchema>

export const defaultCompany: Company = {
  id: null,
  name: '',
  hasRent: false,
  hasLastWeekBonus: false,
  rent: {
    isActive: false,
    discountCost: 0,
    freeHours: 0,
    discountHours: 0,
    cost: 0,
  },
  lastWeekBonus: {
    hours: 0,
    cost: 0,
  },
}

const rent = z.object({
  isActive: z.boolean(),
  freeHours: z.number(),
  discountHours: z.number(),
  discountCost: z.number(),
  cost: z.number(),
})

const lastWeekBonus = z.object({
  hours: z.number(),
  cost: z.number(),
})

export const companySchema = z.object({
  id: z.string().nullable(),
  name: z.string().trim().min(3, 'Название должно быть не меньше 3 символов'),

  hasRent: z.boolean(),
  hasLastWeekBonus: z.boolean(),
  rent,
  lastWeekBonus,
})
