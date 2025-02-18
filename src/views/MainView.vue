<script setup lang="ts">
import { InputNumber } from 'primevue'
import SettingsCustom from '@/components/SettingsCustom.vue'
import CalculatorSum from '@/components/CalculatorSum.vue'
import Information from '@/components/Information.vue'
import BaseInputs from '@/components/BaseInputs.vue'
import Initiation from '@/components/Initiation.vue'
import Statistic from '@/components/Statistic.vue'
import Feeds from '@/components/Feeds.vue'
import { useCourierStore } from '@/store/useCourierStore'
import { storeToRefs } from 'pinia'
const { isLogin } = storeToRefs(useCourierStore())
</script>

<template>
  <main class="calculator">
    <Information :is-login />
    <BaseInputs />
    <CalculatorSum />
  </main>
  <Feeds />
  <SettingsCustom />
  <Statistic :is-login />
  <InputNumber class="hidden" />
  <Initiation />
</template>

<style src="./styles.css" />
