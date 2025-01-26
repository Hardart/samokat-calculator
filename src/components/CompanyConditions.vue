<script lang="ts" setup>
import { MeterGroup } from 'primevue'
import { formatHours } from '@/shared/utils'
import { settings } from '@/shared/localData'
import { companyData } from '@/shared/companyData'
import { computed } from 'vue'
import { shiftsTotal } from '@/shared/shiftData'

const { company } = companyData()

const meterItem = [
  {
    label: 'Отработал',
    value: shiftsTotal.value.hours,
    color: 'darkcyan',
  },
]

const isDiscountDone = computed(() =>
  company.value
    ? company.value.oursForDiscountRent <= shiftsTotal.value.hours
    : false
)
const isFreeRentalDone = computed(() =>
  company.value
    ? company.value.oursForFreeRent == shiftsTotal.value.hours
    : false
)

const rentalCost = computed(() => {
  if (!company.value) return undefined
  if (isDiscountDone.value) return company.value.discountCost
  if (isFreeRentalDone.value) return 0
  return company.value.rentalCost
})
</script>

<template>
  <div class="company-conditions" v-if="company && settings.isRentVehicle">
    <div
      class="company-conditions__discount"
      :class="{ linethrough: isDiscountDone }"
    >
      <span class="free-hours">
        {{ formatHours(company.oursForDiscountRent) }}
      </span>
      для скидки на аренду
    </div>
    <div class="company-conditions__free-rental">
      <span class="free-hours">{{ formatHours(company.oursForFreeRent) }}</span>
      для бесплатной аренды
    </div>
    <MeterGroup :value="meterItem" :max="company?.oursForFreeRent">
      <template #label="{ value }">
        <div v-for="item in value">
          {{ item.label }} - {{ formatHours(item.value) }}
        </div>
      </template>
    </MeterGroup>
    <div class="company-conditions__rental">
      Стоимость аренды за неделю составляет {{ rentalCost }}₽
    </div>
  </div>
</template>
