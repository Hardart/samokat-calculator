<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { Button } from 'primevue'
import HdForm from '../hdForm/HdForm.vue'
import FormTextInput from '../FormTextInput/FormTextInput.vue'
import FormPasswordInput from '../FormPasswordInput/FormPasswordInput.vue'
import {
  type CourierForm,
  courierFormSchema,
} from '@/shared/schemas/courier-schema'

const courierFormData = inject<CourierForm>('courier-form')
if (!courierFormData) throw Error('no courier form data')
const step = defineModel<number>({ required: true })

const submitButtonLabel = computed(() =>
  step.value >= 3 ? 'Зарегистрировать' : 'Далее'
)

const emits = defineEmits(['on-finish'])

const onFormSubmit = async () => {
  step.value++
  if (step.value >= 3) emits('on-finish')
}
</script>

<template>
  <div class="courier-settings">
    <h1>Данные курьера</h1>
    <HdForm
      :state="courierFormData"
      :schema="courierFormSchema"
      @on-submit="onFormSubmit"
    >
      <FormTextInput
        label="Имя"
        id="name"
        v-model="courierFormData.name"
        error-key="name"
      />

      <FormTextInput
        label="Телефон"
        id="phone"
        v-model="courierFormData.phone"
        error-key="phone"
      />

      <FormPasswordInput
        v-model="courierFormData.password"
        label="Пароль"
        id="password"
        error-key="password"
      />

      <Button @click="step--" v-if="step !== 1">Назад</Button>
      <Button type="submit"> {{ submitButtonLabel }} </Button>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
