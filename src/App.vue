<script setup lang="ts">
import Test from './components/Test.vue'
import { useNewShiftStore } from '@/store/useNewShiftStore'
// import { CompanyManager } from './shared/CompanyManager'
import { ShiftManager } from './shared/ShiftManager'

const shiftStore = useNewShiftStore()
// shiftStore.fetchShifts('679fabf4962d166a4f43e95b')
</script>

<template>
  <!-- <Test /> -->
  <RouterView />
</template>

<style scoped></style>
