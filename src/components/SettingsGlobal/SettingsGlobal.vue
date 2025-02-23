<script lang="ts" setup>
import SettingsCheckboxItem from '../SettingsCheckboxItem.vue'
import { useSettingsStore } from '@/store/useSettingStore'
import { useShiftStore } from '@/store/useShiftStore'

const shiftStore = useShiftStore()
const settingsStore = useSettingsStore()
</script>

<template>
  <div class="settings">
    <div class="settings__base">
      <div class="settings__item">
        <p>Стоимость заказа</p>
        <p>{{ shiftStore.singleOrderCost }}₽</p>
      </div>
      <div class="settings__item">
        <p>Стоимость часа</p>
        <p>{{ shiftStore.singleHourPrice }}₽</p>
      </div>
      <SettingsCheckboxItem
        v-model="settingsStore.storageSettings.isLastWeekHours"
        :label="shiftStore.lastWeekBonusLabel"
      />
      <SettingsCheckboxItem
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

<style lang="scss" scoped src="./SettingsGlobal.scss" />
