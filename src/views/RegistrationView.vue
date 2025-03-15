<script setup lang="ts">
import { computed, provide, reactive, ref } from 'vue'
import SettingsForm from '@/components/SettingsForm/SettingsForm.vue'
import CompanyForm from '@/components/CompanyForm/CompanyForm.vue'
import CourierForm from '@/components/CourierForm/CourierForm.vue'
import type { Settings } from '@/shared/schemas/settings-schema'
import type { Company } from '@/shared/schemas/company-schema'
import { useCourierStore } from '@/store/useCourierStore'
import type { CourierForm as CourierFormData } from '@/shared/schemas/courier-schema'
import { useRouter } from 'vue-router'
import { Button } from 'primevue'
const router = useRouter()
const step = ref(1)

const stepper = [
  { step: 1, component: CourierForm },
  { step: 2, component: SettingsForm },
  { step: 3, component: CompanyForm },
]

const activeStep = computed(() =>
  stepper.find((item) => item.step === step.value)
)

const settingsForm = reactive<Settings>({
  id: null,
  orderCost: 0,
  hourCost: 0,
  badWeatherSurcharge: 0,
  extraDays: ['понедельник', 'воскресенье'],
  morningSurcharge: 0,
  eveningSurcharge: 0,
  nightSurcharge: 0,
  extraDaySurcharge: 0,
  isRentingTransport: false,
  transportType: 'scooter',
})

const courierForm: CourierFormData = {
  name: null,
  phone: null,
  password: null,
  role: 'user',
}

const companyForm: Company = {
  id: null,
  name: '',
  discountCost: 0,
  rentalCost: 0,
  lastWeekBonusCost: 0,
  hasLastWeekBonus: false,
  hoursForDiscountRent: 0,
  hoursForFreeRent: 0,
  hoursForLastWeekBonus: 0,
}

provide('courier-form', courierForm)
provide('company-form', companyForm)
provide('settings-form', settingsForm)

const onFinish = async () => {
  const courierStore = useCourierStore()
  const courier = await courierStore.createCourier({
    courierForm,
    companyForm,
    settingsForm,
  })
  if (!courier) return
  await router.push('/')
}
</script>

<template>
  <div class="login-form">
    <component
      v-if="activeStep"
      :is="activeStep.component"
      v-model="step"
      @on-finish="onFinish"
    />
    <Button
      type="button"
      severity="contrast"
      variant="link"
      label="назад"
      @click="$router.push('/')"
    />
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

<!-- <div>
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
</div> -->
