<script lang="ts" setup>
import { watch } from 'vue'

const model = defineModel<number>({
  required: true,
  default: 0,
  set(value) {
    if (typeof value === 'string') value = 0
    return value
  },
})

const { max } = defineProps<{
  label?: string
  id?: string
  showButtons?: boolean
  max?: number
}>()

watch(model, () => {
  if (max && model.value >= max) model.value = max
})
</script>

<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <div class="custom-input">
      <input
        type="text"
        inputmode="numeric"
        class="inputtext"
        :id
        v-model.number="model"
        :max
      />
      <button
        v-if="!showButtons"
        class="pi pi-plus inputnumber-button inputbutton-end"
        @click="model++"
        :disabled="typeof max === 'number' && model >= max"
      />
      <button
        v-if="!showButtons"
        class="pi pi-minus inputnumber-button inputbutton-start"
        @click="model--"
        :disabled="model == 0"
      />
    </div>
  </div>
</template>
