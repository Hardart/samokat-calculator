<script setup lang="ts">
import { InputNumber } from 'primevue'
import Settings from '@/components/Settings.vue'
import BaseInputs from '@/components/BaseInputs.vue'
import Information from '@/components/Information.vue'
import CalculatorSum from '@/components/CalculatorSum.vue'
import Feeds from '@/components/Feeds.vue'
import Statistic from '@/components/Statistic.vue'
</script>

<template>
  <main class="calculator">
    <Information />
    <BaseInputs />
    <CalculatorSum />
  </main>
  <Feeds />
  <Settings />
  <Statistic />
  <InputNumber class="hidden" />
</template>

<style src="./styles.css" />
