<script lang="ts" setup>
import { computed, ref } from 'vue'
import HdForm from '../hdForm/HdForm.vue'
import type { FormError } from '@/composables/useFormValidation'
import { companySchema } from '@/shared/schemas/company-schema'
import { InputText, InputNumber, Button, Checkbox, Message } from 'primevue'
import { useCompanyStore } from '@/store/useCompanyStore'
import { useCourierStore } from '@/store/useCourierStore'
import FormNumberInput from '../FormNumberInput/FormNumberInput.vue'
import FormTextInput from '../FormTextInput/FormTextInput.vue'

const courierStore = useCourierStore()
const companyStore = useCompanyStore()
const errorsMap = ref<Record<string, string>>()
const step = defineModel<number>({ required: true })
const submitButtonLabel = computed(() =>
  step.value >= 3 ? 'Зарегистрировать' : 'Далее'
)

const onFormSubmit = async () => {
  errorsMap.value = {}
  step.value++
  if (step.value >= 3) courierStore.createCourier()
}

const onFormErrors = async (errors?: FormError[]) => {
  errorsMap.value = errors?.reduce((acc, curr) => {
    acc[curr.path] = curr.message
    return acc
  }, {} as Record<string, string>)
}

companyStore.deleteGlobalCompany()
</script>

<template>
  <div class="company-settings">
    <h1>Настройки компании</h1>
    <HdForm
      :state="companyStore.company"
      :schema="companySchema"
      @on-submit="onFormSubmit"
      @on-errors="onFormErrors"
    >
      <FormTextInput
        label="Название компании"
        id="name"
        v-model="companyStore.company.name"
        error-key="name"
      />

      <div class="hd-form__panel">
        <label for="is-last-week-bonus" class="hd-form__label">
          У компании есть бонус за отработанные часы?
        </label>
        <Checkbox
          inputId="is-last-week-bonus"
          v-model="companyStore.company.hasLastWeekBonus"
          binary
        />
      </div>

      <FormNumberInput
        v-if="companyStore.company.hasLastWeekBonus"
        label="Количество часов для бонуса за отработанные часы"
        id="last-week-bonus"
        v-model="companyStore.company.hoursForLastWeekBonus"
      />

      <FormNumberInput
        v-if="companyStore.company.hasLastWeekBonus"
        mode="currency"
        id="last-week-bonus-cost"
        label="Значение бонуса за отработанные часы"
        v-model="companyStore.company.lastWeekBonusCost"
      />

      <FormNumberInput
        v-if="companyStore.company.hasLastWeekBonus"
        id="free-rent-hours"
        label="Количество часов для бесплатной аренды"
        v-model="companyStore.company.hoursForFreeRent"
      />

      <FormNumberInput
        id="discount-rent-hours"
        label="Количество часов для скидки на аренду"
        v-model="companyStore.company.hoursForDiscountRent"
      />

      <FormNumberInput
        mode="currency"
        id="rental-cost"
        label="Стоимость аренды"
        v-model="companyStore.company.rentalCost"
        error-key="rentalCost"
      />

      <FormNumberInput
        mode="currency"
        id="discount-rental-cost"
        label="Стоимость аренды со скидкой"
        v-model="companyStore.company.discountCost"
      />

      <Button @click="step--" v-if="step !== 1">Назад</Button>
      <Button type="submit"> {{ submitButtonLabel }} </Button>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
