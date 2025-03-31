const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
}

const SMALL_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  weekday: 'long',
  month: 'long',
}

export const formattedIntlDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions
) => Intl.DateTimeFormat('ru-RU', options).format(new Date(date))

export const today = new Date()

export function isToday(date: Date | string) {
  return new Date(date).toLocaleDateString() === today.toLocaleDateString()
}

export function isDatesEqual(date: Date | string, comparrDate: Date | string) {
  return (
    new Date(date).toLocaleDateString() ===
    new Date(comparrDate).toLocaleDateString()
  )
}

export const dayId = today.getDay()

export const dayAndMonth = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
  }
  return formattedIntlDate(date, options)
}

export const weekdayFromDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  }
  return formattedIntlDate(date, options)
}

export const formattedDate = (
  isShortOptions: boolean = false,
  date?: Date | string
) => {
  const options = isShortOptions ? SMALL_OPTIONS : DATE_OPTIONS
  return formattedIntlDate(date ?? today, options)
}

export function _getMonthAndYear(offset: number = 0) {
  const today = new Date()

  // Вычисляем новый месяц и год с учетом смещения
  const targetDate = new Date(
    today.getFullYear(),
    today.getMonth() + offset * -1,
    1
  )

  return {
    date: targetDate,
    month: targetDate.getMonth() + 1, // Месяцы начинаются с 0, добавляем 1
    year: targetDate.getFullYear(),
  }
}

export const numericDate = (date: string | Date) =>
  formattedIntlDate(date, { day: '2-digit', month: '2-digit', year: '2-digit' })

export const monthLong = (monthOffset: number) => {
  const { date } = _getMonthAndYear(monthOffset)

  return formattedIntlDate(date, { month: 'long' })
}

export function getWeekRange(weekOffset: number = 0) {
  const now = new Date()
  const day = now.getDay() === 0 ? 7 : now.getDay()
  const setDate = now.getDate() - day + 1 - weekOffset * 7

  const startOfWeek = new Date(now.setDate(setDate)) // Понедельник
  const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6)) // Воскресенье
  startOfWeek.setHours(0, 0, 0)
  endOfWeek.setHours(23, 59, 59)

  return {
    startDate: startOfWeek.toISOString(),
    endDate: endOfWeek.toISOString(),
  }
}

export function getMonthRange(monthOffset: number = 0) {
  const { month, year } = _getMonthAndYear(monthOffset)
  const correctMonth = month >= 12 ? 11 : month - 1 // Корректируем номер месяца (1 = январь, 12 = декабрь)
  const startOfMonth = new Date(year, correctMonth, 1) // Первый день месяца
  const endOfMonth = new Date(year, correctMonth + 1, 0, 23, 59, 59) // Последний день месяца

  return {
    startDate: startOfMonth.toISOString(),
    endDate: endOfMonth.toISOString(),
  }
}
