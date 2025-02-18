<script setup lang="ts">
import router from '@/router'
import { Message, InputText, Button, Password, Select } from 'primevue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import {
  courierFormSchema,
  type CourierLoginForm,
} from '@/shared/schemas/courier-schema'
import { useSettingsStore } from '@/store/useSettingStore'
import { useCourierStore } from '@/store/useCourierStore'

const resolver = zodResolver(courierFormSchema)

const onFormSubmit = async (e: FormSubmitEvent) => {
  if (e.valid) {
    const loginData: CourierLoginForm = {
      phone: e.states.phone.value,
      password: e.states.password.value,
    }
    const courierStore = useCourierStore()
    const courier = await courierStore.fetchCourier(loginData)
    const baseStore = useSettingsStore()
    baseStore.localSettings.isSettingsOpen = false
    if (courier?.id) await router.push('/')
  }
}
</script>

<template>
  <div>
    <Form :resolver @submit="onFormSubmit" class="login-form">
      <FormField v-slot="$field" as="section" name="phone">
        <InputText
          type="text"
          inputmode="numeric"
          placeholder="Телефон"
          class="login-form__input"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          variant="simple"
          size="small"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>
      <FormField v-slot="$field" asChild name="password">
        <section>
          <Password
            placeholder="Пароль"
            :feedback="false"
            toggleMask
            type="text"
            fluid
            input-class="login-form__input"
          />
          <Message
            v-if="$field?.invalid"
            variant="simple"
            severity="error"
            size="small"
          >
            {{ $field.error?.message }}
          </Message>
        </section>
      </FormField>
      <Button type="submit" severity="secondary" label="Войти" />
      <Button
        type="button"
        severity="contrast"
        variant="link"
        label="назад"
        @click="$router.push('/')"
      />
    </Form>
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
