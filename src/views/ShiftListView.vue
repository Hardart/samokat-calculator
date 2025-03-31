<script setup lang="ts">
import { ref } from 'vue'
import { SelectButton, Button } from 'primevue'
import PeriodRange from '@/components/PeriodRange.vue'
import ShiftsTotal from '@/components/ShiftsTotal.vue'
import ShiftItem from '@/components/ShiftItem/ShiftItem.vue'
import { formatHours, formatOrders } from '@/shared/utils'
import { useShiftsFilter } from '@/composables/useShiftsFilter'
import { useNewShiftStore } from '@/store/useNewShiftStore'
import Confirm from '@/components/Confirm.vue'
import { useToggle } from '@vueuse/core'

const shiftsStore = useNewShiftStore()

const options = ref([
  { option: 'week', label: 'Неделя' },
  { option: 'month', label: 'Месяц' },
])

const {
  filteredShiftsByYear,
  filteredShiftsByPeriod,
  isMonthPeriod,
  isWeekPeriod,
  isPeriodNull,
  filterBy,
  monthLabel,
  setRange,
  setPeriodToMonth,
} = useShiftsFilter()

const [isConfirmOpen, toggleConfirmState] = useToggle()
let shiftId: string

const onDeleteShift = (id: string) => {
  toggleConfirmState(true)
  shiftId = id
}
</script>

<template>
  <main class="shifts">
    <div class="period-switch" v-if="!isPeriodNull">
      <Button
        class="back-button"
        icon="pi pi-arrow-left"
        variant="text"
        label="назад"
        rounded
        size="small"
        aria-label="Navigation back"
        @click="$router.back"
      />
      <SelectButton
        v-model="shiftsStore.periodType"
        :options
        option-label="label"
        option-value="option"
      />
    </div>
    <PeriodRange
      v-if="isWeekPeriod"
      @encrease="shiftsStore.changeOffset"
      @decrease="shiftsStore.changeOffset"
      v-bind="shiftsStore.range"
    />

    <ul class="year-shift-list" v-if="isMonthPeriod">
      <li v-for="year in filteredShiftsByYear.keys()" class="year-shift-card">
        <h3 class="year-title">{{ year }}</h3>
        <ul class="month-shift-list">
          <li
            v-for="[monthLabel, shift] in filteredShiftsByYear.get(year)"
            class="month-shift-card"
            @click="setRange(shift.month, year, monthLabel)"
          >
            <h4 class="month-title">{{ monthLabel }}</h4>
            <div class="month-shift-card__info">
              <p>Отработал - {{ formatHours(shift.hours) }}</p>
              <p>Выполнил - {{ formatOrders(shift.orders) }}</p>
            </div>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="shift-list" v-if="isWeekPeriod">
      <ShiftItem
        v-for="shift in filteredShiftsByPeriod"
        :shift
        @delete-shift="onDeleteShift"
      />
    </ul>
    <div v-if="isPeriodNull">
      <div class="period-switch">
        <Button
          class="back-button"
          icon="pi pi-arrow-left"
          variant="text"
          label="назад"
          rounded
          size="small"
          aria-label="Navigation back"
          @click="setPeriodToMonth"
        />
        <span>{{ monthLabel }}</span>
      </div>
      <ul>
        <ShiftItem v-for="shift in filterBy" :shift />
      </ul>
    </div>
    <ShiftsTotal
      :shifts="filteredShiftsByPeriod"
      v-if="isWeekPeriod && filteredShiftsByPeriod.length"
    />
    <Confirm
      v-model="isConfirmOpen"
      @confirm="shiftsStore.deleteShift(shiftId)"
    />
  </main>
</template>

<style lang="scss">
.period-switch {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-button.back-button {
  position: absolute;
  left: 0;
}

.year-shift-list {
  display: grid;
  row-gap: 15px;
  margin-top: 20px;
}

.month-shift-list {
  display: grid;
  row-gap: 10px;
}

.month-shift-card {
  padding: 10px 15px;
  background-color: var(--color-background-soft);
  border-radius: 6px;
  cursor: pointer;

  &__info {
    font-size: 0.785rem;
    line-height: 15px;
  }
}

.year-title {
  font-size: 0.8rem;
  font-weight: 700;
}

.month-title {
  margin-bottom: 7px;
  font-weight: 600;
  line-height: 16px;

  &::first-letter {
    text-transform: uppercase;
  }
}
</style>
