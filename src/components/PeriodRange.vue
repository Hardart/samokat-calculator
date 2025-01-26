<script lang="ts" setup>
import { ButtonGroup, Button } from 'primevue'
import { dayAndMonth } from '@/shared/date'
import { isShowNextWeekRange, shiftWeekRange, weekRange } from '@/shared/utils'
import { showMissedDates } from '@/shared/shiftData'
const increaseRange = () => {
  shiftWeekRange.value++
  showMissedDates.value = false
}
const decreaseRange = () => {
  shiftWeekRange.value--
  showMissedDates.value = false
}
</script>

<template>
  <div class="period-range">
    C {{ dayAndMonth(weekRange.startDate) }} по
    {{ dayAndMonth(weekRange.endDate) }}
    <div>
      <ButtonGroup>
        <Button
          size="small"
          icon="pi pi-angle-left"
          @click="increaseRange"
          variant="text"
        />
        <Button
          size="small"
          icon="pi pi-angle-right"
          @click="decreaseRange"
          :disabled="isShowNextWeekRange"
          variant="text"
        />
      </ButtonGroup>
    </div>
  </div>
</template>
