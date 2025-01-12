<script lang="ts" setup>
import HdInput from '@/components/HdInput.vue'
import { ordersData } from '@/shared/ordersData'
import { hoursData } from '@/shared/hoursData'
import { settings } from '@/shared/localData'

import {
  Accordion,
  AccordionPanel,
  AccordionHeader,
  AccordionContent,
} from 'primevue'
</script>

<template>
  <div class="card">
    <Accordion value="0">
      <AccordionPanel value="1">
        <AccordionHeader>Надбавки</AccordionHeader>
        <AccordionContent>
          <div class="input-group">
            <HdInput
              v-model="ordersData.morningOrders"
              label="Утренние заказы (7:00-9:00)"
              id="morning"
            />
          </div>
          <div class="input-group mt-s">
            <HdInput
              v-model="ordersData.eveningOrders"
              label="Вечерние заказы (18:00-23:00)"
              id="eveningOrders"
            />
          </div>
          <div class="input-group mt-s">
            <HdInput
              v-model="ordersData.nightOrders"
              label="Ночные заказы (23:00-01:00)"
              id="nightOrders"
            />
          </div>

          <p v-if="settings.isExtraDay" class="feed-day">
            Действует прибавка к часу:
            <span class="feed-day__price">
              {{ hoursData.EXTRA_MONEY_PER_HOUR }}₽
            </span>
            к часу
          </p>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>
