type AggregatedData = {
  orders: number
  hours: number
  tips: number
  month: number
}
type MonthMap = Map<string, AggregatedData>
import type { Shift } from '@/shared/schemas/shift-schema'
import { computed, reactive, ref } from 'vue'
import { useShiftStore } from '@/store/useShiftStore'
import { formattedIntlDate, getWeekRange, getMonthRange } from '@/shared/date'

export const useShiftsFilter = () => {
  const shiftStore = useShiftStore()

  const monthData = reactive({
    month: -1,
    year: -1,
  })

  const monthLabel = ref()

  function _groupAndAggregateShiftsByYearAndMonthUsingReduce(shifts: Shift[]) {
    return shifts.reduce((accShifts, currShift) => {
      const { year, month, monthLabel } = _createDatesForMap(currShift)

      if (!accShifts.has(year)) accShifts.set(year, new Map())

      const yearMap = accShifts.get(year)!
      if (!yearMap.has(monthLabel)) _setDefaultYearMap(yearMap, monthLabel)

      const monthData = yearMap.get(monthLabel)!
      monthData.orders += currShift.orders.total
      monthData.hours += currShift.workHours
      monthData.tips += currShift.tips
      monthData.month = month

      return accShifts
    }, new Map<number, MonthMap>())
  }

  function _setDefaultYearMap(yearMap: MonthMap, month: string) {
    yearMap.set(month, {
      orders: 0,
      hours: 0,
      tips: 0,
      month: -1,
    })
  }

  function _createDatesForMap(currShift: Shift) {
    const date = new Date(currShift.date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthLabel = formattedIntlDate(date, { month: 'long' })
    return { year, month, monthLabel }
  }

  function _filterByDateRange(
    data: Shift[],
    startDate: string,
    endDate: string
  ) {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    if (isNaN(start) || isNaN(end)) {
      throw new Error('Invalid date format')
    }

    return data.filter((item) => {
      const itemDate = new Date(item.date).getTime()
      return itemDate >= start && itemDate <= end
    })
  }

  const isWeekPeriod = computed(() => shiftStore.periodType === 'week')
  const isMonthPeriod = computed(() => shiftStore.periodType === 'month')
  const isPeriodNull = computed(() => !shiftStore.periodType)

  const filteredShiftsByYear = computed(() =>
    _groupAndAggregateShiftsByYearAndMonthUsingReduce(shiftStore.shifts)
  )

  const filteredShiftsByPeriod = computed(() => {
    const { startDate, endDate } = getWeekRange(shiftStore.range.weekOffset)
    return _filterByDateRange(shiftStore.shifts, startDate, endDate)
  })

  function setRange(month: number, year: number, label: string) {
    monthData.month = month
    monthData.year = year
    monthLabel.value = label
    shiftStore.periodType = null
  }

  function setPeriodToMonth() {
    shiftStore.periodType = 'month'
  }

  const filterBy = computed(() => {
    const startOfMonth = new Date(monthData.year, monthData.month, 1) // Первый день месяца
    const endOfMonth = new Date(
      monthData.year,
      monthData.month + 1,
      0,
      23,
      59,
      59
    ) // Последний день месяца
    const startDate = startOfMonth.toISOString()
    const endDate = endOfMonth.toISOString()

    return _filterByDateRange(shiftStore.shifts, startDate, endDate)
  })

  return {
    filteredShiftsByYear,
    filteredShiftsByPeriod,
    isMonthPeriod,
    isWeekPeriod,
    isPeriodNull,
    filterBy,
    monthLabel,
    setRange,
    setPeriodToMonth,
  }
}
