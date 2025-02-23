<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { FormError } from '@/composables/useFormValidation'
import { settingsSchema, type Settings } from '@/shared/schemas/settings-schema'

import { MultiSelect, SelectButton, Button, Checkbox, Message } from 'primevue'
import HdForm from '../hdForm/HdForm.vue'
import { useSettingsStore } from '@/store/useSettingStore'
import { useCourierStore } from '@/store/useCourierStore'
import FormNumberInput from '../FormNumberInput/FormNumberInput.vue'
const courierStore = useCourierStore()
const settingsStore = useSettingsStore()
const step = defineModel<number>({ required: true })
const submitButtonLabel = computed(() =>
  step.value >= 3 ? 'Зарегистрировать' : 'Далее'
)

const errorsMap = ref<Record<string, string>>()

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
  () => `выбрал ${settingsStore.settings.extraDays.length}`
)
</script>

<template>
  <div class="main-settings">
    <h1>Настройки</h1>
    <HdForm
      :state="settingsStore.settings"
      :schema="settingsSchema"
      @on-submit="onFormSubmit"
      @on-errors="onFormErrors"
    >
      <FormNumberInput
        v-model="settingsStore.settings.hourCost"
        id="hour-cost"
        mode="currency"
        errorKey="hourCost"
        label="Стоимость часа"
      />

      <FormNumberInput
        v-model="settingsStore.settings.orderCost"
        id="order-cost"
        mode="currency"
        errorKey="orderCost"
        label="Стоимость заказа"
      />

      <FormNumberInput
        v-model="settingsStore.settings.morningSurcharge"
        id="morning-surcharge"
        errorKey="morningSurcharge"
        label="Бонус к заказу с 7:00 до 9:00"
        mode="currency"
      />

      <FormNumberInput
        v-model="settingsStore.settings.eveningSurcharge"
        id="evening-surcharge"
        errorKey="eveningSurcharge"
        label="Бонус к заказу с 18:00 до 23:00"
        mode="currency"
      />

      <FormNumberInput
        v-model="settingsStore.settings.nightSurcharge"
        id="night-surcharge"
        errorKey="nightSurcharge"
        label="Бонус к заказу с 23:00 до 01:00"
        mode="currency"
      />

      <FormNumberInput
        v-model="settingsStore.settings.badWeatherSurcharge"
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
          v-model="settingsStore.settings.extraDays"
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
        v-if="settingsStore.settings.extraDays.length"
        v-model="settingsStore.settings.extraDaySurcharge"
        id="exttra-day-surcharge"
        errorKey="extraDaySurcharge"
        label="Бонус к часу в выбранные дни"
        mode="currency"
      />

      <div class="hd-form__panel">
        <label class="hd-form__label"> Мой транспорт </label>
        <SelectButton
          name="selection"
          v-model="settingsStore.settings.transportType"
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
          v-model="settingsStore.settings.isRentingTransport"
          binary
        />
      </div>

      <Button @click="step--" v-if="step !== 1">Назад</Button>
      <Button type="submit"> {{ submitButtonLabel }} </Button>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
