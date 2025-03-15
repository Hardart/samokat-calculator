<script lang="ts" setup>
import { ShiftManager } from '@/shared/ShiftManager'

const current = ShiftManager.getComputedShift()
</script>

<template>
  <div class="mt-l">{{ current }}</div>
</template>

<style lang="scss" scoped src="" />
