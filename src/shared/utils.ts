import { computed, ref } from 'vue'

function getHoursDeclension(number: number, word: string) {
  const absNumber = Math.abs(number) // На случай, если число отрицательное
  const lastDigit = absNumber % 10 // Последняя цифра
  const lastTwoDigits = absNumber % 100 // Последние две цифры
  const endings = ['а', 'ов']

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${word}${endings[1]}` // Исключение для чисел 11–14
  if (lastDigit === 1) return `${word}` // Например, 1 час
  if (lastDigit >= 2 && lastDigit <= 4) return `${word}${endings[0]}` // Например, 2, 3, 4 часа

  return `${word}${endings[1]}` // Например, 0, 5, 6 часов
}

export function formatHours(number: number) {
  return `${number} ${getHoursDeclension(number, 'час')}`
}

export function formatOrders(number: number) {
  return `${number} ${getHoursDeclension(number, 'заказ')}`
}

function getWeekRange(weekShift: number = 0) {
  const now = new Date()
  const day = now.getDay() === 0 ? 7 : now.getDay()
  const setDate = now.getDate() - day + 1 - weekShift * 7

  const startOfWeek = new Date(now.setDate(setDate)) // Понедельник
  const endOfWeek = new Date(now.setDate(startOfWeek.getDate() + 6)) // Воскресенье
  startOfWeek.setHours(0, 0, 0)
  endOfWeek.setHours(23, 59, 59)

  return {
    startDate: startOfWeek,
    endDate: endOfWeek,
  }
}

export const shiftWeekRange = ref(0)
export const isShowNextWeekRange = computed(() => shiftWeekRange.value <= 0)

export const weekRange = computed(() => getWeekRange(shiftWeekRange.value))

export const isInPeriod = (date: Date | string) => {
  const toDate = new Date(date)
  return (
    toDate >= weekRange.value.startDate && toDate <= weekRange.value.endDate
  )
}
