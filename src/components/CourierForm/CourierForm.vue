<script lang="ts" setup>
import { computed, ref } from 'vue'
import HdForm from '../hdForm/HdForm.vue'
import type { FormError } from '@/composables/useFormValidation'

import {
  InputText,
  InputNumber,
  Button,
  Checkbox,
  Message,
  Password,
} from 'primevue'
import { useCourierStore } from '@/store/useCourierStore'
import { courierFormSchema } from '@/shared/schemas/courier-schema'
import FormTextInput from '../FormTextInput/FormTextInput.vue'

const courierStore = useCourierStore()
const errorsMap = ref<Record<string, string>>()
const step = defineModel<number>({ required: true })
const submitButtonLabel = computed(() =>
  step.value >= 3 ? 'Зарегистрировать' : 'Далее'
)

const onFormSubmit = async () => {
  errorsMap.value = {}
  step.value++
  if (step.value >= 3) useCourierStore().createCourier()
}
const onFormErrors = async (errors?: FormError[]) => {
  errorsMap.value = errors?.reduce((acc, curr) => {
    if (!(curr.path in acc)) acc[curr.path] = curr.message
    return acc
  }, {} as Record<string, string>)
}
</script>

<template>
  <div class="courier-settings">
    <h1>Данные курьера</h1>
    <HdForm
      :state="courierStore.courier"
      :schema="courierFormSchema"
      @on-submit="onFormSubmit"
      @on-errors="onFormErrors"
    >
      <FormTextInput
        label="Имя"
        id="name"
        v-model="courierStore.courier.name"
        error-key="name"
      />

      <FormTextInput
        label="Телефон"
        id="phone"
        v-model="courierStore.courier.phone"
        error-key="phone"
      />

      <div>
        <div class="hd-form__panel">
          <label for="password" class="hd-form__label">Пароль</label>
          <Password
            :feedback="false"
            inputId="password"
            type="text"
            v-model="courierStore.courier.password"
            size="small"
            class="hd-form__input--text"
            fluid
          />
        </div>
        <Message
          v-if="errorsMap?.password"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ errorsMap.password }}
        </Message>
      </div>

      <Button @click="step--" v-if="step !== 1">Назад</Button>
      <Button type="submit"> {{ submitButtonLabel }} </Button>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
