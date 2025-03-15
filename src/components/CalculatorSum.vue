<script lang="ts" setup>
import { Button } from 'primevue'
import { ShiftManager } from '@/shared/ShiftManager'
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
      @click="shiftStore.addShift"
      :disabled="shiftStore.isShiftSaved"
    />
    <Button
      label="Сбросить"
      class="save-btn"
      @click="ShiftManager.resetCurrentShift"
      fluid
      severity="warn"
    />
  </div>
</template>
