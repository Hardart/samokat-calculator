<script lang="ts" setup>
import { Button } from 'primevue'
import { useShiftStore } from '@/store/useShiftStore'
import { useSettingsStore } from '@/store/useSettingStore'
import { computed } from 'vue'

const shiftStore = useShiftStore()
const settingsStore = useSettingsStore()

const saveButtonLabel = computed(() =>
  shiftStore.loadingShifts
    ? 'Загрузка'
    : shiftStore.isShiftSaved
    ? 'Сохранено'
    : 'Сохранить'
)
</script>

<template>
  <div class="sum">
    <p class="sum__title">Заработал сегодня</p>
    <h3 class="sum__value">{{ shiftStore.profitForDay }} ₽</h3>

    <Button
      fluid
      class="save-btn"
      :label="saveButtonLabel"
      @click="shiftStore.saveShift"
      :disabled="shiftStore.isShiftSaved || shiftStore.loadingShifts"
    />
    <Button
      label="Сбросить"
      class="save-btn"
      @click="settingsStore.resetStorageSettings"
      fluid
      severity="warn"
    />
  </div>
</template>
