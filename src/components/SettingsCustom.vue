<script lang="ts" setup>
import type { Courier } from '@/shared/schemas/courier-schema'
import { computed } from 'vue'
import { useCourierStore } from '@/store/useCourierStore'
import { useSettingsStore } from '@/store/useSettingStore'
import { storeToRefs } from 'pinia'
import { Button, Checkbox, Dialog } from 'primevue'

const { localSettings, settings, storageSettings } = useSettingsStore()

const courierStore = useCourierStore()
const { courier, isLogin, isRideOnScooter, isSettingsChanged } =
  storeToRefs(courierStore)

const vehicleType = computed(() =>
  isRideOnScooter.value ? 'электросамокате' : 'велосипеде'
)
const baseHourPrice = computed(() =>
  isRideOnScooter.value
    ? settings?.electricScooterCostPerHour
    : settings?.bicycleCostPerHour
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
        <div class="settings__item" v-if="courier.company.hasLastWeekBonus">
          <p>
            <label for="last-week-bonus">
              Отработал {{ courier.company.hoursForLastWeekBonus }}ч. прошлой
              неделе?
            </label>
          </p>
          <p>
            <Checkbox
              v-model="storageSettings.isLastWeekHours"
              inputId="last-week-bonus"
              name="last-week-bonus"
              binary
            />
          </p>
        </div>

        <!-- <div class="settings__item" v-if="courier.company.hasRent">
          <p><label for="is-rent-vehicle">Транспорт в аренду?</label></p>
          <p>
            <Checkbox
              v-model="courier.company.isVehicleInRent"
              inputId="is-rent-vehicle"
              name="is-rent-vehicle"
              binary
            />
          </p>
        </div> -->
      </div>
      <div class="settings__company">
        <div class="settings__item">
          <p>Компания</p>
          <p>{{ courier.company.name }}</p>
        </div>
        <div class="settings__item">
          <p>Работаю на</p>
          <p>
            <Button
              :label="vehicleType"
              size="small"
              severity="secondary"
              @click="courierStore.changeTransportType"
            />
          </p>
        </div>
        <div class="settings__item" v-if="courier.company.hasRent">
          <p>Базовая стоимость часа</p>
          <p>{{ baseHourPrice }}₽</p>
        </div>
        <div class="settings__item" v-if="storageSettings.isLastWeekHours">
          <p>Бонус к стоимости часа на этой неделе</p>
          <p>{{ courier.company.lastWeekBonusCost }}₽</p>
        </div>
        <div class="settings__item">
          <p>Базовая стоимость заказа</p>
          <p>{{ courier.settings.orderCost }}₽</p>
        </div>
      </div>
    </div>
    <div v-else class="settings">
      <div class="settings__base">
        <div class="settings__item">
          <p>Базовая стоимость заказа</p>
          <p>{{ settings?.orderCost }}₽</p>
        </div>
        <div class="settings__item">
          <p>Базовая стоимость часа на электро</p>
          <p>{{ settings?.electricScooterCostPerHour }}₽</p>
        </div>

        <!-- <div class="settings__item" v-if="courier.company.hasRent">
          <p><label for="is-rent-vehicle">Транспорт в аренду?</label></p>
          <p>
            <Checkbox
              v-model="courier.company.isVehicleInRent"
              inputId="is-rent-vehicle"
              name="is-rent-vehicle"
              binary
            />
          </p>
        </div> -->
      </div>
    </div>
    <Button
      v-if="isLogin"
      label="сохранить настройки"
      severity="warn"
      size="small"
      fluid
      @click="courierStore.saveUserSettings"
      :disabled="isSettingsChanged"
    />
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
