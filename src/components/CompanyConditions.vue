<script lang="ts" setup>
import { computed } from 'vue'
import { MeterGroup } from 'primevue'
import { formatHours } from '@/shared/utils'
import type { Company } from '@/shared/schemas/company-schema'
import type { Shift } from '@/shared/schemas/shift-schema'
interface ShiftsTotal {
  orders: number
  hours: number
  tips: number
  totalEarnings: number
}

const { company, shifts } = defineProps<{ company: Company; shifts: Shift[] }>()
const total = computed(() =>
  shifts.reduce(
    (acc, curr) => {
      acc.orders += curr.orders.total
      acc.hours += curr.workHours
      acc.tips += curr.tips
      acc.totalEarnings += curr.totalEarnings

      return acc
    },
    { orders: 0, hours: 0, tips: 0, totalEarnings: 0 } as ShiftsTotal
  )
)
const meterItem = [
  {
    label: 'Отработал',
    value: total.value.hours,
    color: 'darkcyan',
  },
]

const isDiscountDone = computed(() =>
  company ? company.hoursForDiscountRent <= total.value.hours : false
)
const isFreeRentalDone = computed(() =>
  company ? company.hoursForFreeRent == total.value.hours : false
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
