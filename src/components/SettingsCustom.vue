<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Button, Dialog } from 'primevue'
import { useCourierStore } from '@/store/useCourierStore'
import { useSettingsStore } from '@/store/useSettingStore'
import { useShiftStore } from '@/store/useShiftStore'
import SettingsCheckboxItem from './SettingsCheckboxItem.vue'
const settingsStore = useSettingsStore()
const { localSettings, settings, storageSettings } = storeToRefs(settingsStore)

const shiftStore = useShiftStore()
const { singleHourPrice, singleOrderCost } = storeToRefs(shiftStore)

const courierStore = useCourierStore()
const { courier, isLogin } = storeToRefs(courierStore)
const extraDaysLabel = computed(
  () => `Сегодня ${settings.value.extraDays.join(' или ')}?`
)
const lastWeekBonusLabel = computed(
  () => `Отработал ${courier.value?.company.hoursForLastWeekBonus}ч. прошлой
              неделе?`
)
</script>

<template>
  <Dialog
    v-model:visible="localSettings.isSettingsOpen"
    :style="{ width: '25rem' }"
    header="Настройки"
    modal
  >
    <div v-if="courier" class="settings">
      <div class="settings__base">
        <div class="settings__item">
          <p>Курьер</p>
          <p>{{ courier.name }}</p>
        </div>
      </div>
      <div class="settings__company">
        <div class="settings__item">
          <p>Компания</p>
          <p>{{ courier.company.name }}</p>
        </div>

        <div class="settings__item mt-m" v-if="courier.company.hasRent">
          <p>Базовая стоимость часа</p>
          <p>{{ singleHourPrice }}₽</p>
        </div>

        <div class="settings__item">
          <p>Cтоимость заказа</p>
          <p>{{ singleOrderCost }}₽</p>
        </div>

        <SettingsCheckboxItem
          v-if="courier.company.hasLastWeekBonus"
          v-model="storageSettings.isLastWeekHours"
          :label="lastWeekBonusLabel"
        />
        <SettingsCheckboxItem
          v-if="settings.extraDays.length"
          v-model="storageSettings.isExtraDay"
          :label="extraDaysLabel"
        />
        <SettingsCheckboxItem
          v-model="storageSettings.isWeatherSurcharge"
          label="Сегодня плохая погода?"
        />
      </div>
    </div>
    <div v-else class="settings">
      <div class="settings__base">
        <div class="settings__item">
          <p>Базовая стоимость заказа</p>
          <p>{{ settings.orderCost }}₽</p>
        </div>
      </div>
    </div>

    <div v-if="!isLogin">
      <Button
        label="создать учетную запись курьера"
        severity="contrast"
        size="small"
        fluid
      />
      <Button
        label="уже есть учетка, войти"
        severity="success"
        size="small"
        fluid
        @click="$router.push({ name: 'login' })"
      />
    </div>
    <div v-else>
      <Button
        label="выйти из учетной записи"
        severity="secondary"
        size="small"
        fluid
        @click="courierStore.logout"
      />
    </div>
  </Dialog>
</template>

<style>
.settings {
  padding: 20px 10px;
}

.settings__base {
  display: grid;
  margin-bottom: 30px;
}

.settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
