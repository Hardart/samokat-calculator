import { z } from 'zod'
const ExtraDay = [
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
  'воскресенье',
] as const

export const settingsSchema = z.object({
  id: z.string().optional(),
  orderCost: z.number(),
  isDefault: z.boolean().optional(),
  hourCost: z.number(),
  morningSurcharge: z.number(),
  eveningSurcharge: z.number(),
  nightSurcharge: z.number(),
  badWeatherSurcharge: z.number(),
  extraDaySurcharge: z.number(),
  extraDays: z.array(z.enum(ExtraDay)),
  transportType: z.enum(['scooter', 'bycicle']),
  isRentingTransport: z.boolean(),
  __v: z.number().optional(),
})

export type Settings = z.output<typeof settingsSchema>
