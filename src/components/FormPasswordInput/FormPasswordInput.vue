<script lang="ts" setup>
import { computed, inject, ref, type Ref } from 'vue'
import { Password, Message } from 'primevue'
import type { FormError } from '@/composables/useFormValidation'

const modelValue = defineModel<string | null>({ required: true })
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
      <label :for="id" class="hd-form__label">{{ label }}</label>
      <Password
        :feedback="false"
        :inputId="id"
        type="text"
        v-model="modelValue"
        size="small"
        class="hd-form__input--text"
        fluid
      />
    </div>
    <Message v-if="error" severity="error" size="small" variant="simple">
      {{ error }}
    </Message>
  </div>
</template>

<style lang="scss" scoped src="./FormPasswordInput.scss" />
