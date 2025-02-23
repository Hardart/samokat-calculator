import { z } from 'zod'

const ordersSchema = z.object({
  morning: z.number(),
  evening: z.number(),
  night: z.number(),
  total: z.number(),
})

export const shiftSchema = z.object({
  id: z.string().optional(),
  date: z.date(),
  workHours: z.number(),
  tips: z.number(),
  orders: ordersSchema,
  orderCost: z.number(),
  hourCost: z.number(),
  totalEarnings: z.number(),
  courier: z.string(),
})

export type Shift = z.output<typeof shiftSchema>
