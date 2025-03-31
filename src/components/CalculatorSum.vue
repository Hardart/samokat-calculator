<script lang="ts" setup>
import { Button } from 'primevue'
import { ShiftCalculator } from '@/shared/ShiftCalculator'
import { useLabels } from '@/composables/useLabels'
import { useNewShiftStore } from '@/store/useNewShiftStore'

const shiftStore = useNewShiftStore()
const labels = useLabels()
</script>

<template>
  <div class="sum">
    <p class="sum__title">Заработал сегодня</p>
    <h3 class="sum__value">{{ ShiftCalculator.getComputedEarnings }} ₽</h3>

    <Button
      fluid
      class="save-btn"
      :label="labels.saveButtonLabel.value"
      @click="shiftStore.saveShift"
      :disabled="shiftStore.isShiftSaved"
    />
    <Button
      label="Сбросить"
      class="save-btn"
      @click="shiftStore.resetShift"
      fluid
      severity="warn"
    />
  </div>
</template>
