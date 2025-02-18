<script lang="ts" setup>
import type { Company } from '@/shared/schemas/company-schema'
import type { GlobalSettings } from '@/shared/schemas/settings-schema'
import { computed } from 'vue'
import { Button, Checkbox, Dialog, Select } from 'primevue'
import CompanyConditions from './CompanyConditions.vue'

const isSettingsOpen = defineModel<boolean>({ required: true })
const company = defineModel<Company>('company', { required: true })

const { settings } = defineProps<{
  settings: GlobalSettings
  companies: Company[] | undefined
  hourPrice: number
  isLogin: boolean
}>()

const isUseScooter = computed(() => company.value.isWorkOnScooter)

const hourBasePrice = computed(() => {
  const { baseHourScooterPrice, baseHourBicyclePrice } = settings
  let price = isUseScooter.value ? baseHourScooterPrice : baseHourBicyclePrice
  if (company.value.isLastWeekBonus) price += company.value.lastWeekBonus
  return price
})
</script>

<template>
  <Dialog
    v-model:visible="isSettingsOpen"
    :style="{ width: '25rem' }"
    header="Настройки"
    modal
  >
    <div
      class="input-group input-group--horisontal input-group--align-center gap-m"
    >
      Я работаю в компании
      <Select
        v-model="company"
        placeholder="выбери компанию"
        class="input-group"
        :options="companies"
        optionLabel="name"
      />
    </div>
    {{ company.name }}
    <div class="input-table" v-if="company.hasLastWeekBonus">
      <label for="last-week-hours" class="input-table__label">
        Отработал {{ company.hoursForLastWeekBonus }}ч на прошлой неделе +10₽ в
        час
      </label>
      <Checkbox
        v-model="company.isLastWeekBonus"
        inputId="last-week-hours"
        name="last-week-hours"
        binary
      />
    </div>

    <div class="input-table" v-if="company.hasRent">
      <label for="is-rent-vehicle" class="input-table__label">
        <span v-if="company.isWorkOnScooter"> Электросамокат</span>
        <span v-else>Велосипед</span> в аренду
      </label>
      <Checkbox
        v-model="company.isVehicleInRent"
        inputId="is-rent-vehicle"
        name="is-rent-vehicle"
        binary
      />
    </div>
    <CompanyConditions :company v-if="company.isVehicleInRent" />

    <p v-else-if="company.name && !company.hasRent" class="rent-information">
      Компания
      <span class="rent-information__company">{{ company.name }}</span> не
      предоставляет транспорт в аренду
    </p>

    <div class="mt-l">
      Я езжу на
      <Button
        :label="company.isWorkOnScooter ? 'электросамокате' : 'велосипеде'"
        size="small"
        severity="secondary"
        @click="company.isWorkOnScooter = !company.isWorkOnScooter"
      />
      за {{ hourBasePrice }}₽ в час
    </div>
    <Button
      v-if="!isLogin"
      label="создать учетную запись курьера"
      severity="contrast"
      size="small"
      fluid
    />
    <Button
      v-if="!isLogin"
      label="уже есть учетка, войти"
      severity="success"
      size="small"
      fluid
      @click="$router.push({ name: 'login' })"
    />
  </Dialog>
</template>

<style>
.rent-information {
  margin-top: 10px;
  padding: 10px;
  font-size: 0.875rem;
  text-align: center;
  background-color: var(--vt-c-divider-light-2);
  border-radius: 8px;
}

.rent-information__company {
  font-weight: 800;
}
</style>
