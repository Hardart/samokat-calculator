<script lang="ts" setup>
defineProps<{
  label?: string
  id?: string
  value: number
  max?: number
  disabledIncrease?: boolean
  disabledDecrease?: boolean
}>()
defineEmits(['increase', 'decrease'])
</script>

<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <div class="custom-input">
      <input
        :id
        type="text"
        inputmode="numeric"
        class="inputtext"
        :value
        :max
      />
      <button
        class="pi pi-plus inputnumber-button inputbutton-end"
        @click="$emit('increase')"
        :disabled="disabledIncrease"
      />
      <button
        class="pi pi-minus inputnumber-button inputbutton-start"
        @click="$emit('decrease')"
        :disabled="disabledDecrease"
      />
    </div>
  </div>
</template>
