<script lang="ts" setup>
import HdInput from '@/components/HdInput.vue'
import { useShiftStore } from '@/store/useShiftStore'
import { storeToRefs } from 'pinia'
const shiftStore = useShiftStore()
const { baseData } = storeToRefs(shiftStore)
</script>

<template>
  <div>
    <div class="input-group">
      <HdInput
        v-model.number="baseData.hours"
        label="Количество часов"
        id="hours"
        :max="100"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        v-model.number="baseData.orders"
        label="Количество заказов"
        id="orders"
      />
    </div>
    <div class="input-group mt-s">
      <HdInput
        showButtons
        v-model.number="baseData.tips"
        label="Чаевые"
        id="tips"
      />
    </div>
  </div>
</template>
