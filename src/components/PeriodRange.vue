<script lang="ts" setup>
import { ButtonGroup, Button } from 'primevue'
import { dayAndMonth, getWeekRange } from '@/shared/date'
import { computed } from 'vue'
const { weekOffset } = defineProps<{
  weekOffset: number
}>()

defineEmits(['encrease', 'decrease'])

const rangeLabel = computed(() => {
  const { startDate, endDate } = getWeekRange(weekOffset)
  return `C ${dayAndMonth(startDate)} по ${dayAndMonth(endDate)}`
})
</script>

<template>
  <div class="period-range">
    <span>
      {{ rangeLabel }}
    </span>

    <div>
      <ButtonGroup>
        <Button
          size="small"
          icon="pi pi-angle-left"
          @click="$emit('encrease', true)"
          variant="text"
        />
        <Button
          size="small"
          icon="pi pi-angle-right"
          @click="$emit('decrease', false)"
          variant="text"
        />
      </ButtonGroup>
    </div>
  </div>
</template>
