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
