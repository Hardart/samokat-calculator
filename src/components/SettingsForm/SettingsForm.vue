<script lang="ts" setup>
import { computed, inject, type Ref } from 'vue'
import { MultiSelect, SelectButton, Button, Checkbox } from 'primevue'
import HdForm from '../hdForm/HdForm.vue'
import FormNumberInput from '../FormNumberInput/FormNumberInput.vue'
import { settingsSchema, type Settings } from '@/shared/schemas/settings-schema'

const settingsFormData = inject<Settings>('settings-form')
if (!settingsFormData) throw Error('no courier form data')

const step = defineModel<number>({ required: true })

const submitButtonLabel = computed(() =>
  step.value >= 3 ? 'Зарегистрировать' : 'Далее'
)

const emits = defineEmits(['on-finish'])

const onFormSubmit = async () => {
  step.value++
  if (step.value >= 3) emits('on-finish')
}

const tranportOptions = [
  { label: 'Электро', value: 'scooter' },
  { label: 'Велосипед', value: 'bycicle' },
]

const extradaysOptions = [
  'понедельник',
  'вторник',
  'среда',
  'четверг',
  'пятница',
  'суббота',
  'воскресенье',
]
const extraDaysLengthMessage = computed(
  () => `выбрано ${settingsFormData.extraDays.length}`
)
</script>

<template>
  <div class="main-settings">
    <h1>Настройки</h1>
    <HdForm
      :state="settingsFormData"
      :schema="settingsSchema"
      @on-submit="onFormSubmit"
    >
      <FormNumberInput
        v-model="settingsFormData.hourCost"
        id="hour-cost"
        mode="currency"
        errorKey="hourCost"
        label="Стоимость часа"
      />

      <FormNumberInput
        v-model="settingsFormData.orderCost"
        id="order-cost"
        mode="currency"
        errorKey="orderCost"
        label="Стоимость заказа"
      />

      <FormNumberInput
        v-model="settingsFormData.morningSurcharge"
        id="morning-surcharge"
        errorKey="morningSurcharge"
        label="Бонус к заказу с 7:00 до 9:00"
        mode="currency"
      />

      <FormNumberInput
        v-model="settingsFormData.eveningSurcharge"
        id="evening-surcharge"
        errorKey="eveningSurcharge"
        label="Бонус к заказу с 18:00 до 23:00"
        mode="currency"
      />

      <FormNumberInput
        v-model="settingsFormData.nightSurcharge"
        id="night-surcharge"
        errorKey="nightSurcharge"
        label="Бонус к заказу с 23:00 до 01:00"
        mode="currency"
      />

      <FormNumberInput
        v-model="settingsFormData.badWeatherSurcharge"
        id="weather-surcharge"
        errorKey="badWeatherSurcharge"
        label="Бонус к заказу за плохую погоду"
        mode="currency"
      />

      <div class="hd-form__panel">
        <label for="is-transport-in-rent" class="hd-form__label">
          Дни, в которые есть бонус к часу
        </label>
        <MultiSelect
          v-model="settingsFormData.extraDays"
          :options="extradaysOptions"
          :filter="false"
          :showToggleAll="false"
          placeholder="Выберите дни"
          size="small"
          :max-selected-labels="2"
          :selected-items-label="extraDaysLengthMessage"
        />
      </div>

      <FormNumberInput
        v-if="settingsFormData.extraDays.length"
        v-model="settingsFormData.extraDaySurcharge"
        id="exttra-day-surcharge"
        errorKey="extraDaySurcharge"
        label="Бонус к часу в выбранные дни"
        mode="currency"
      />

      <div class="hd-form__panel">
        <label class="hd-form__label"> Мой транспорт </label>
        <SelectButton
          name="selection"
          v-model="settingsFormData.transportType"
          :options="tranportOptions"
          optionLabel="label"
          optionValue="value"
        />
      </div>

      <div class="hd-form__panel">
        <label for="is-transport-in-rent" class="hd-form__label">
          Транспорт в аренду?
        </label>
        <Checkbox
          inputId="is-transport-in-rent"
          v-model="settingsFormData.isRentingTransport"
          binary
        />
      </div>

      <Button @click="step--" v-if="step !== 1">Назад</Button>
      <Button type="submit"> {{ submitButtonLabel }} </Button>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
