<script lang="ts" setup>
const model = defineModel<number>({
  required: true,
  default: 0,
  set(value) {
    if (typeof value === 'string') value = 0
    return value
  },
})
defineProps<{
  label?: string
  id?: string
  showButtons?: boolean
}>()
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
      />
      <button
        v-if="!showButtons"
        class="pi pi-plus inputnumber-button inputbutton-end"
        @click="model++"
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
