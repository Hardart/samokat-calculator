<script setup lang="ts">
import router from '@/router'
import { Message, InputText, Button, Password } from 'primevue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import {
  courierLoginFormSchema,
  courierSchema,
  type CourierLoginForm,
} from '@/shared/schemas/courier-schema'
import { useCourierStore } from '@/store/useCourierStore'
import { useAppSettings } from '@/composables/useAppSettings'
import { useShiftStore } from '@/store/useShiftStore'
import HdForm from '@/components/hdForm/HdForm.vue'
import type { FormError } from '@/composables/useFormValidation'
import FormTextInput from '@/components/FormTextInput/FormTextInput.vue'
import FormPasswordInput from '@/components/FormPasswordInput/FormPasswordInput.vue'

const { appSettings } = useAppSettings()
const loginForm: CourierLoginForm = {
  phone: '',
  password: '',
}

const onFormSubmit = async (e: FormError) => {
  const shiftSrore = useShiftStore()
  const courierStore = useCourierStore()
  await courierStore.fetchCourier(loginForm)

  appSettings.isSettingsOpen = false

  if (courierStore.isLogin) {
    await router.push('/')
    shiftSrore.getShiftsList()
  }
}
</script>

<template>
  <div>
    <HdForm
      :schema="courierLoginFormSchema"
      :state="loginForm"
      @on-submit="onFormSubmit"
    >
      <FormTextInput
        v-model="loginForm.phone"
        label="Телефон"
        id="phone"
        error-key="phone"
      />
      <FormPasswordInput
        v-model="loginForm.password"
        label="Пароль"
        id="password"
        error-key="password"
      />
      <Button type="submit" severity="secondary" label="Войти" />
      <Button
        type="button"
        severity="contrast"
        variant="link"
        label="назад"
        @click="$router.push('/')"
      />
    </HdForm>
  </div>
</template>

<style>
.login-form {
  display: grid;
  width: 400px;
  margin-inline: auto;
  row-gap: 16px;
}

.login-form__group {
  display: flex;
  width: 100%;
}

.login-form__input {
  width: 100% !important;
  max-width: 100% !important;
  text-align: left;
}

.login-form__section {
  display: flex;
}
</style>
