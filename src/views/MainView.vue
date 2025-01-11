<script setup lang="ts">
import { InputNumber } from 'primevue'
import Settings from '@/components/Settings.vue'

import OrdersBonus from '@/components/OrdersBonus.vue'
import BaseInputs from '@/components/BaseInputs.vue'
import Information from '@/components/Information.vue'
</script>

<template>
  <main class="calculator">
    <Information />
    <BaseInputs />
    <OrdersBonus />
  </main>
  <Settings />
  <InputNumber class="hidden" />
</template>

<style src="./styles.css" />
