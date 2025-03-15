<script setup lang="ts">
import { InputNumber } from 'primevue'
import BaseInputs from '@/components/BaseInputs.vue'
import Information from '@/components/Information.vue'
import FeedsNew from '@/components/FeedsNew.vue'
import Settings from '@/components/Settings.vue'
import CalculatorSum from '@/components/CalculatorSum.vue'
</script>

<template>
  <main class="calculator">
    <BaseInputs />
    <FeedsNew />
    <CalculatorSum />
    <Information />
    <Settings />
    <InputNumber class="hidden" />
  </main>
</template>
