<script setup lang="ts">
import router from '@/router'
import { Message, InputText, Button, Password, Select } from 'primevue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { Form, FormField, type FormSubmitEvent } from '@primevue/forms'
import {
  courierFormSchema,
  type CourierForm,
} from '@/shared/schemas/courier-schema'
import { useSettingsStore } from '@/store/useSettingStore'
import { courierAPI } from '@/api/courier-api'

const resolver = zodResolver(courierFormSchema)

const onFormSubmit = async (e: FormSubmitEvent) => {
  if (e.valid) {
    const courier: CourierForm = {
      name: e.states.name.value,
      companyId: e.states.companyId.value,
      password: e.states.password.value,
      phone: e.states.phone.value,
      role: 'user',
    }

    const newCourier = await courierAPI.registration(courier)
    if (newCourier?.id) await router.push('/')
  }
}

const baseStore = useSettingsStore()
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

      <FormField v-slot="$field" as="section" name="name">
        <InputText type="text" placeholder="Имя" class="login-form__input" />
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
          <Select
            name="companyId"
            :options="baseStore.companies"
            optionLabel="name"
            option-value="id"
            placeholder="Выберите компанию"
            fluid
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </section>
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
      <Button type="submit" severity="secondary" label="Создать учётку" />
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
