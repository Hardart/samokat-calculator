<script setup lang="ts">
import { InputNumber } from 'primevue'
import { storeToRefs } from 'pinia'
import Settings from '@/components/Settings.vue'
import CalculatorSum from '@/components/CalculatorSum.vue'
import Information from '@/components/Information.vue'
import BaseInputs from '@/components/BaseInputs.vue'
import Initiation from '@/components/Initiation.vue'
import Statistic from '@/components/Statistic.vue'
import Feeds from '@/components/Feeds.vue'
import { useCourierStore } from '@/store/useCourierStore'
import Shifts from '@/components/Shifts.vue'
const { isLogin } = storeToRefs(useCourierStore())
</script>

<template>
  <main class="calculator">
    <Information :is-login />
    <BaseInputs />
    <CalculatorSum />
    <Feeds />
    <Settings />
    <Statistic :is-login />
    <Shifts />
    <InputNumber class="hidden" />
    <Initiation />
  </main>
</template>
