const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
}

export const today = new Date()
export const dayId = today.getDay()
export const formattedDate = Intl.DateTimeFormat('ru-RU', DATE_OPTIONS).format(
  today
)
export const formattedWeekday = Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
}).format(today)
