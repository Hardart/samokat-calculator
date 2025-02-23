<script lang="ts" setup>
import { useSettingsStore } from '@/store/useSettingStore'
import { useShiftStore } from '@/store/useShiftStore'
import { Dialog } from 'primevue'
import { watch } from 'vue'
import ShiftItem from './ShiftItem/ShiftItem.vue'

defineProps<{ isLogin?: boolean }>()
const settingsStore = useSettingsStore()
const shiftsStore = useShiftStore()

shiftsStore.getShiftsForWeek()
</script>

<template>
  <Dialog
    v-model:visible="settingsStore.localSettings.isShiftsOpen"
    modal
    :style="{ width: '22rem' }"
  >
    <template #header>
      <div class="p-dialog-header p-dialog-header--custom">
        <h3 class="p-dialog-title">Смены</h3>
      </div>
    </template>
    <ul class="shift-list">
      <ShiftItem v-for="shift in shiftsStore.shifts" :shift />
    </ul>
  </Dialog>
</template>

<style>
.shift-list {
  display: flex;
  flex-direction: column;
}
</style>
