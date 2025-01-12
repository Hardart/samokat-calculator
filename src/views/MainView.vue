<script setup lang="ts">
import { InputNumber } from 'primevue'
import Settings from '@/components/Settings.vue'
import BaseInputs from '@/components/BaseInputs.vue'
import Information from '@/components/Information.vue'
import OrdersBonus from '@/components/OrdersBonus.vue'
import CalculatorSum from '@/components/CalculatorSum.vue'
import Feeds from '@/components/Feeds.vue'
</script>

<template>
  <main class="calculator">
    <Information />
    <BaseInputs />
    <CalculatorSum />
  </main>
  <Feeds />
  <Settings />
  <InputNumber class="hidden" />
</template>

<style src="./styles.css" />
