<script lang="ts" setup>
import { computed } from 'vue'
import { MeterGroup } from 'primevue'
import { formatHours } from '@/shared/utils'
import { shiftsTotal } from '@/shared/shiftData'
import type { Company } from '@/shared/schemas/company-schema'

const { company } = defineProps<{ company: Company }>()

const meterItem = [
  {
    label: 'Отработал',
    value: shiftsTotal.value.hours,
    color: 'darkcyan',
  },
]

const isDiscountDone = computed(() =>
  company ? company.hoursForDiscountRent <= shiftsTotal.value.hours : false
)
const isFreeRentalDone = computed(() =>
  company ? company.hoursForFreeRent == shiftsTotal.value.hours : false
)

const rentalCost = computed(() => {
  if (!company) return undefined
  if (isDiscountDone.value) return company.discountCost
  if (isFreeRentalDone.value) return 0
  return company.rentalCost
})
</script>

<template>
  <div class="company-conditions">
    <div
      class="company-conditions__discount"
      :class="{ linethrough: isDiscountDone }"
    >
      <span class="free-hours">
        {{ formatHours(company.hoursForDiscountRent) }}
      </span>
      для скидки на аренду
    </div>
    <div class="company-conditions__free-rental">
      <span class="free-hours">{{
        formatHours(company.hoursForFreeRent)
      }}</span>
      для бесплатной аренды
    </div>
    <MeterGroup :value="meterItem" :max="company?.hoursForFreeRent">
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
