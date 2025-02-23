<script lang="ts" setup>
import { useCourierStore } from '@/store/useCourierStore'
import { useSettingsStore } from '@/store/useSettingStore'
import { useShiftStore } from '@/store/useShiftStore'
import SettingsCheckboxItem from './SettingsCheckboxItem.vue'

const courierStore = useCourierStore()
const settingsStore = useSettingsStore()
const shiftStore = useShiftStore()
</script>

<template>
  <div v-if="courierStore.isLogin" class="settings">
    <div class="settings__base">
      <div class="settings__item">
        <p>Курьер</p>
        <p>{{ courierStore.courier.name }}</p>
      </div>
    </div>
    <div class="settings__company">
      <div class="settings__item">
        <p>Компания</p>
        <p>{{ courierStore.courier.company.name }}</p>
      </div>

      <div class="settings__item mt-m">
        <p>Базовая стоимость часа</p>
        <p>{{ shiftStore.singleHourPrice }}₽</p>
      </div>

      <div class="settings__item">
        <p>Cтоимость заказа</p>
        <p>{{ shiftStore.singleOrderCost }}₽</p>
      </div>

      <SettingsCheckboxItem
        v-if="courierStore.courier.company.hasLastWeekBonus"
        v-model="settingsStore.storageSettings.isLastWeekHours"
        :label="shiftStore.lastWeekBonusLabel"
      />
      <SettingsCheckboxItem
        v-if="settingsStore.settings.extraDays.length"
        v-model="settingsStore.storageSettings.isExtraDay"
        :label="shiftStore.extraDaysLabel"
      />
      <SettingsCheckboxItem
        v-model="settingsStore.storageSettings.isWeatherSurcharge"
        label="Сегодня плохая погода?"
      />
    </div>
  </div>
</template>
