<script lang="ts" setup>
import { computed, inject, ref, type Ref } from 'vue'
import { InputText, Message } from 'primevue'
import type { FormError } from '@/composables/useFormValidation'

const modelValue = defineModel<string>({ required: true })
const { errorKey } = defineProps<{
  id: string
  label: string
  errorKey?: string
}>()

const errors = inject<Ref<FormError[]> | null>('form-errors', null)
const error = computed(() => {
  return errors?.value.find((error) => error.path === errorKey)?.message
})
</script>

<template>
  <div>
    <div class="hd-form__panel">
      <label for="name" class="hd-form__label">{{ label }}</label>
      <InputText
        id="name"
        type="text"
        v-model="modelValue"
        size="small"
        class="hd-form__input--text"
      />
    </div>
    <Message v-if="error" severity="error" size="small" variant="simple">
      {{ error }}
    </Message>
  </div>
</template>

<style lang="scss" scoped src="./FormTextInput.scss" />
