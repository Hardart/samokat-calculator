<script lang="ts" setup>
import { Dialog } from 'primevue'
import { storeToRefs } from 'pinia'
import HdInput from './HdInput.vue'
import { settings } from '@/shared/localData'
import { useSettingsStore } from '@/store/useSettingStore'

const settingsStore = useSettingsStore()
const { storageSettings } = storeToRefs(settingsStore)
</script>

<template>
  <Dialog
    v-model:visible="settings.isOpenFeeds"
    modal
    header="Надбавки"
    :style="{ width: '25rem' }"
  >
    <div class="input-group">
      <HdInput
        v-model="storageSettings.morningOrders"
        label="Утренние заказы (7:00-9:00)"
        id="morning"
      />
    </div>
    <div class="input-group mt-m">
      <HdInput
        v-model="storageSettings.eveningOrders"
        label="Вечерние заказы (18:00-23:00)"
        id="eveningOrders"
      />
    </div>
    <div class="input-group mt-m">
      <HdInput
        v-model="storageSettings.nightOrders"
        label="Ночные заказы (23:00-01:00)"
        id="nightOrders"
      />
    </div>
  </Dialog>
</template>
