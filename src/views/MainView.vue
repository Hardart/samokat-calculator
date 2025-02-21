<script setup lang="ts">
import { InputNumber } from 'primevue'
import { storeToRefs } from 'pinia'
import SettingsCustom from '@/components/SettingsCustom.vue'
import CalculatorSum from '@/components/CalculatorSum.vue'
import Information from '@/components/Information.vue'
import BaseInputs from '@/components/BaseInputs.vue'
import Initiation from '@/components/Initiation.vue'
import Statistic from '@/components/Statistic.vue'
import Feeds from '@/components/Feeds.vue'
import { useCourierStore } from '@/store/useCourierStore'
const { isLogin } = storeToRefs(useCourierStore())
</script>

<template>
  <main class="calculator">
    <Information :is-login />
    <BaseInputs />
    <CalculatorSum />
    <Feeds />
    <SettingsCustom />
    <Statistic :is-login />
    <InputNumber class="hidden" />
    <Initiation />
  </main>
</template>

<style src="./styles.css" />
