<script lang="ts" setup>
import SettingsCheckboxItem from './SettingsCheckboxItem.vue'
import { useUser } from '@/composables/useUser'
import { useLabels } from '@/composables/useLabels'
import { ShiftManager } from '@/shared/ShiftManager'
import { CostCalculator } from '@/shared/CostCalculator'

const { lastWeekBonusLabel, extraDaysLabel } = useLabels()
const { courier, isLogin } = useUser()
const shift = ShiftManager.getComputedShift()
const settings = ShiftManager.getComutedSettings()
</script>

<template>
  <div class="settings">
    <div class="settings__base">
      <div class="settings__item" v-if="isLogin">
        <p>Курьер</p>
        <p>{{ courier.name }}</p>
      </div>
    </div>
    <div class="settings__company mt-m">
      <div class="settings__item" v-if="isLogin">
        <p>Компания</p>
        <p>{{ shift.company.name }}</p>
      </div>

      <div class="mt-l">
        <SettingsCheckboxItem
          v-if="shift.company.hasLastWeekBonus && isLogin"
          v-model="settings.isLastWeekHours"
          :label="lastWeekBonusLabel"
        />

        <SettingsCheckboxItem
          v-model="settings.isExtraDay"
          :label="extraDaysLabel"
        />
        <SettingsCheckboxItem
          v-model="settings.isWeatherSurcharge"
          label="Сегодня плохая погода?"
        />
      </div>

      <div class="settings__item mt-l">
        <p>Стоимость часа</p>
        <p>{{ CostCalculator.singleHourCost }}₽</p>
      </div>

      <div class="settings__item">
        <p>Cтоимость заказа</p>
        <p>{{ CostCalculator.singleOrderCost }}₽</p>
      </div>
    </div>
  </div>
</template>
