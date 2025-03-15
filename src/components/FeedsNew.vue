<script lang="ts" setup>
import { ref } from 'vue'
import { Dialog } from 'primevue'
import CustomInput from './CustomInput.vue'
import { ShiftManager } from '@/shared/ShiftManager'
import { ShiftCalculator } from '@/shared/ShiftCalculator'

import { useAppSettings } from '@/composables/useAppSettings'
const { appSettings } = useAppSettings()
const shift = ShiftManager.getComputedShift()
</script>

<template>
  <Dialog
    v-model:visible="appSettings.isFeedsOpen"
    modal
    header="Надбавки"
    :style="{ width: '25rem' }"
  >
    <div class="input-group">
      <CustomInput
        :value="shift.morningOrders"
        @increase="ShiftCalculator.incrementMorningOrders"
        @decrease="ShiftCalculator.decrementMorningOrders"
        label="Утренние заказы (7:00-8:00)"
        id="morning"
        :disabled-increase="ShiftCalculator.isIncreaseDisable"
      />
    </div>

    <div class="input-group mt-m">
      <CustomInput
        :value="shift.nightOrders"
        @increase="ShiftCalculator.incrementNightOrders"
        @decrease="ShiftCalculator.decrementNightOrders"
        label="Ночные заказы (00:00-01:00)"
        id="nightOrders"
        :disabled-increase="ShiftCalculator.isIncreaseDisable"
      />
    </div>
  </Dialog>
</template>
