<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import HdInput from '@/components/HdInput.vue'
import { useSettingsStore } from '@/store/useSettingStore'

const settingsStore = useSettingsStore()
const { storageSettings } = storeToRefs(settingsStore)
</script>

<template>
  <div>
    <div class="input-group">
      <HdInput
        v-model.number="storageSettings.hours"
        label="Количество часов"
        id="hours"
        :max="100"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        v-model.number="storageSettings.orders"
        label="Количество заказов"
        id="orders"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        showButtons
        v-model.number="storageSettings.tips"
        label="Чаевые"
        id="tips"
      />
    </div>
  </div>
</template>
