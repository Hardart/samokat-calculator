<script lang="ts" setup>
const vModel = defineModel<number>({
  required: true,

  set(value) {
    if (typeof value === 'string' && value === '') value = 0
    return value
  },
})
defineProps<{
  label?: string
  id?: string
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
        v-model="vModel"
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
