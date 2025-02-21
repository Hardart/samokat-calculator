<script lang="ts" setup>
import { Button } from 'primevue'

import { useShiftStore } from '@/store/useShiftStore'
import { storeToRefs } from 'pinia'

const shiftStore = useShiftStore()
const { profitForDay } = storeToRefs(shiftStore)
</script>

<template>
  <div class="sum">
    <p class="sum__title">Заработал сегодня</p>
    <h3 class="sum__value">{{ profitForDay }} ₽</h3>

    <Button label="Сохранить" class="save-btn" fluid />
    <Button label="Сбросить" class="save-btn" fluid severity="warn" />
  </div>
</template>
