import { z } from 'zod'

export const shiftSchema = z.object({
  id: z.string().optional(),
  date: z.date(),
  hours: z.number(),
  tips: z.number(),
  orders: z.number(),
  morningOrders: z.number(),
  eveningOrders: z.number(),
  nightOrders: z.number(),
  orderCost: z.number(),
  hourCost: z.number(),
  totalEarnings: z.number(),
  courier: z.string(),
})

export type ZShift = z.output<typeof shiftSchema>
