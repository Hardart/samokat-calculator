<script lang="ts" setup>
import { Dialog } from 'primevue'
import HdInput from './HdInput.vue'
import { useCostInfo } from '@/composables/useCostInfo'
import { useAppSettings } from '@/composables/useAppSettings'
import { useStorageSettings } from '@/composables/useStorageSettings'

const { storage } = useStorageSettings()
const { appSettings } = useAppSettings()
const { canAddPartOfDay } = useCostInfo()
// const buttons = [
//   {
//     id: 'morning',
//     label: 'Утренние заказы (7:00-9:00)',
//     vModel: storageSettings.value.morningOrders,
//     disabled: canAddPartOfDay.value,
//   },
// ]
</script>

<template>
  <Dialog
    v-model:visible="appSettings.isFeedsOpen"
    modal
    header="Надбавки"
    :style="{ width: '25rem' }"
  >
    <div class="input-group">
      <HdInput
        v-model="storage.morningOrders"
        label="Утренние заказы (7:00-8:00)"
        id="morning"
      />
    </div>
    <!-- <div class="input-group mt-m">
      <HdInput
        v-model="storage.eveningOrders"
        label="Вечерние заказы (18:00-23:00)"
        id="eveningOrders"
        :disabled="canAddPartOfDay"
      />
    </div> -->
    <div class="input-group mt-m">
      <HdInput
        v-model="storage.nightOrders"
        label="Ночные заказы (00:00-01:00)"
        id="nightOrders"
        :disabled="canAddPartOfDay"
      />
    </div>
  </Dialog>
</template>
