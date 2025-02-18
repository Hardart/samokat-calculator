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
  morningOrders: z.number(),
  eveningOrders: z.number(),
  nightOrders: z.number(),
  tips: z.number(),
  orders: ordersSchema,
  totalEarnings: z.number(),
})

export type Shift = z.output<typeof shiftSchema>
