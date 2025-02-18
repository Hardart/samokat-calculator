<script lang="ts" setup>
import { Checkbox, Dialog } from 'primevue'
import { settings } from '@/shared/localData'
import { useShiftStore } from '@/store/useShiftStore'
import { storeToRefs } from 'pinia'
const shiftStore = useShiftStore()
const { baseData } = storeToRefs(shiftStore)
import HdInput from './HdInput.vue'
</script>

<template>
  <Dialog
    v-model:visible="settings.isOpenFeeds"
    modal
    header="Надбавки"
    :style="{ width: '25rem' }"
  >
    <div class="input-group">
      <HdInput
        v-model="baseData.morningOrders"
        label="Утренние заказы (7:00-9:00)"
        id="morning"
      />
    </div>
    <div class="input-group mt-m">
      <HdInput
        v-model="baseData.eveningOrders"
        label="Вечерние заказы (18:00-23:00)"
        id="eveningOrders"
      />
    </div>
    <div class="input-group mt-m">
      <HdInput
        v-model="baseData.nightOrders"
        label="Ночные заказы (23:00-01:00)"
        id="nightOrders"
      />
    </div>
    <div class="input-group input-group--horisontal gap-l mt-xl">
      <div class="input-group input-group--horisontal gap-s">
        <Checkbox
          v-model="settings.isExtraWeatherMoney"
          inputId="weather"
          name="weather"
          binary
        />
        <label for="weather">Погода</label>
      </div>
      <div class="input-group input-group--horisontal gap-s">
        <Checkbox
          v-model="settings.isExtraDay"
          inputId="extraDay"
          name="extraDay"
          binary
        />
        <label for="extraDay">15₽ к часу</label>
      </div>
    </div>
  </Dialog>
</template>
