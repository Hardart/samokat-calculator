<script lang="ts" setup>
import { computed, inject, ref, type Ref } from 'vue'
import { InputNumber, Message } from 'primevue'
import type { FormError } from '@/composables/useFormValidation'

const modelValue = defineModel<number>({ required: true })
const { mode, errorKey } = defineProps<{
  id: string
  label: string
  errorKey?: string
  mode?: 'currency' | 'decimal'
}>()

const attrs = computed(() => {
  if (mode !== 'currency') return {}
  return {
    currency: 'RUB',
    mode,
    locale: 'ru-RU',
    minFractionDigits: 0,
  }
})

const errors = inject<Ref<FormError[]> | null>('form-errors', null)
const error = computed(() => {
  return errors?.value.find((error) => error.path === errorKey)?.message
})
</script>

<template>
  <div>
    <div class="hd-form__panel">
      <label :for="id" class="hd-form__label">{{ label }} </label>
      <InputNumber
        :inputId="id"
        v-model="modelValue"
        size="small"
        inputClass="hd-form__input--number"
        v-bind="{ ...attrs }"
      />
    </div>
    <Message v-if="error" severity="error" size="small" variant="simple">
      {{ error }}
    </Message>
  </div>
</template>

<style lang="scss" scoped src="./FormNumberInput.scss" />
