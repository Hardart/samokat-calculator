<script lang="ts" setup>
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
        v-model="shift.morningOrders"
        @increase="ShiftCalculator.incrementPartOfDayOrders('morning')"
        @decrease="ShiftCalculator.decrementPartOfDayOrders('morning')"
        label="Утренние заказы (7:00-8:00)"
        id="morning"
        :disabled-increase="ShiftCalculator.isIncreaseDisable"
      />
    </div>

    <div class="input-group mt-m">
      <CustomInput
        v-model="shift.eveningOrders"
        @increase="ShiftCalculator.incrementPartOfDayOrders('evening')"
        @decrease="ShiftCalculator.decrementPartOfDayOrders('evening')"
        label="Вечерние заказы (23:00-00:00)"
        id="evening"
        :disabled-increase="ShiftCalculator.isIncreaseDisable"
      />
    </div>

    <div class="input-group mt-m">
      <CustomInput
        v-model="shift.nightOrders"
        @increase="ShiftCalculator.incrementPartOfDayOrders('night')"
        @decrease="ShiftCalculator.decrementPartOfDayOrders('night')"
        label="Ночные заказы (00:00-01:00)"
        id="night"
        :disabled-increase="ShiftCalculator.isIncreaseDisable"
      />
    </div>
  </Dialog>
</template>
