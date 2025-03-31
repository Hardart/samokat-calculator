<script lang="ts" setup>
import { computed, inject } from 'vue'
import { Button, Checkbox } from 'primevue'
import HdForm from '../hdForm/HdForm.vue'
import { companySchema, type Company } from '@/shared/schemas/company-schema'
import FormTextInput from '../FormTextInput/FormTextInput.vue'
import FormNumberInput from '../FormNumberInput/FormNumberInput.vue'

const step = defineModel<number>({ required: true })

const companyFormData = inject<Company>('company-form')
if (!companyFormData) throw Error('no company form data')

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
  <div class="company-settings">
    <h1>Настройки компании</h1>
    <HdForm
      :state="companyFormData"
      :schema="companySchema"
      @on-submit="onFormSubmit"
    >
      <FormTextInput
        label="Название компании"
        id="name"
        v-model="companyFormData.name"
        error-key="name"
      />

      <div class="hd-form__panel">
        <label for="is-last-week-bonus" class="hd-form__label">
          У компании есть бонус за отработанные часы?
        </label>
        <Checkbox
          inputId="is-last-week-bonus"
          v-model="companyFormData.hasLastWeekBonus"
          binary
        />
      </div>

      <FormNumberInput
        v-if="companyFormData.hasLastWeekBonus"
        label="Количество часов для бонуса за отработанные часы"
        id="last-week-bonus"
        v-model="companyFormData.lastWeekBonus.hours"
      />

      <FormNumberInput
        v-if="companyFormData.hasLastWeekBonus"
        mode="currency"
        id="last-week-bonus-cost"
        label="Значение бонуса за отработанные часы"
        v-model="companyFormData.lastWeekBonus.cost"
      />

      <FormNumberInput
        v-if="companyFormData.hasLastWeekBonus"
        id="free-rent-hours"
        label="Количество часов для бесплатной аренды"
        v-model="companyFormData.rent.freeHours"
      />

      <FormNumberInput
        id="discount-rent-hours"
        label="Количество часов для скидки на аренду"
        v-model="companyFormData.rent.discountHours"
      />

      <FormNumberInput
        mode="currency"
        id="rental-cost"
        label="Стоимость аренды"
        v-model="companyFormData.rent.cost"
        error-key="rentalCost"
      />

      <FormNumberInput
        mode="currency"
        id="discount-rental-cost"
        label="Стоимость аренды со скидкой"
        v-model="companyFormData.rent.discountCost"
      />

      <Button @click="step--" v-if="step !== 1">Шаг назад</Button>
      <Button type="submit"> {{ submitButtonLabel }} </Button>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
