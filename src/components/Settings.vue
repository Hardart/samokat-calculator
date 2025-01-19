<script lang="ts" setup>
import { computed } from 'vue'
import { Button, Checkbox, Dialog, Select } from 'primevue'
import { settings, isShowLastWeekHours } from '@/shared/localData'
import { hoursData, singleHourPrice } from '@/shared/hoursData'
import { companyData } from '@/shared/companyData'
import CompanyConditions from './CompanyConditions.vue'

const { companyNames, myCompany } = companyData()
const costForVehicle = computed(() =>
  settings.value.isBicycle
    ? hoursData.value.BICYCLE_HOUR_PRICE
    : hoursData.value.SCOOTER_HOUR_PRICE
)

const company = computed(() => myCompany(settings.value.company))
const meterItem = [
  {
    label: 'Отработал',
    value: 10,
    color: 'darkcyan',
  },
]
</script>

<template>
  <Dialog
    v-model:visible="settings.isOpen"
    modal
    header="Настройки"
    :style="{ width: '25rem' }"
  >
    <div
      class="input-group input-group--horisontal input-group--align-center gap-m"
    >
      Я работаю в компании
      <Select
        class="input-group"
        v-model="settings.company"
        :options="companyNames"
        placeholder="выбери компанию"
      />
    </div>
    <div class="input-table" v-if="isShowLastWeekHours">
      <label for="last-week-hours" class="input-table__label"
        >Отработал 30ч на прошлой неделе +10₽ в час</label
      >
      <Checkbox
        v-model="settings.isLastWeekHours"
        inputId="last-week-hours"
        name="last-week-hours"
        binary
      />
    </div>
    <div class="input-table">
      <label for="is-rent-vehicle" class="input-table__label">
        <span v-if="settings.isBicycle">Велосипед</span>
        <span v-else>Электросамокат</span> в аренду
      </label>
      <Checkbox
        v-model="settings.isRentVehicle"
        inputId="is-rent-vehicle"
        name="is-rent-vehicle"
        binary
      />
    </div>
    <CompanyConditions />

    <div class="feeds">
      Я езжу на
      <Button
        :label="settings.isBicycle ? 'велосипеде' : 'электросамокате'"
        size="small"
        severity="secondary"
        @click="settings.isBicycle = !settings.isBicycle"
      />
      за {{ singleHourPrice }}₽ в час
    </div>
  </Dialog>
</template>
