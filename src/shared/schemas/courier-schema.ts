import { z } from 'zod'
import { companySchema } from './company-schema'
import { settingsSchema } from './settings-schema'

export const courierSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  company: companySchema,
  settings: settingsSchema,
  role: z.enum(['creator', 'admin', 'user']),
})

export const courierFormSchema = z.object({
  phone: z
    .string({ required_error: 'Обязательное поле' })
    .trim()
    .startsWith('8', 'Номер должен начинаться с 8')
    .min(11, { message: 'Введите полный номер телефона' })
    .max(11, { message: 'Номер не должен быть больше 11 цифр' }),
  name: z
    .string({ required_error: 'Обязательное поле' })
    .trim()
    .min(2, { message: 'Имя должно быть больше 2 знаков' })
    .max(25, { message: 'Слишком длинное имя' }),

  companyId: z.string({ required_error: 'Обязательное поле' }).trim(),
  role: z.enum(['creator', 'admin', 'user']).default('user'),
  password: z
    .string({ required_error: 'Обязательное поле' })
    .trim()
    .min(7, { message: 'Пароль должен быть минимум 7 знаков' }),
})

export const courierLoginFormSchema = z.object({
  phone: z
    .string({ required_error: 'Обязательное поле' })
    .trim()
    .startsWith('8', 'Номер должен начинаться с 8')
    .min(11, { message: 'Введите полный номер телефона' })
    .max(11, { message: 'Номер не должен быть больше 11 цифр' }),
  password: z
    .string({ required_error: 'Обязательное поле' })
    .trim()
    .min(7, { message: 'Пароль должен быть минимум 7 знаков' }),
})

export type Courier = z.output<typeof courierSchema>
export type CourierForm = z.output<typeof courierFormSchema>
export type CourierLoginForm = z.output<typeof courierLoginFormSchema>
