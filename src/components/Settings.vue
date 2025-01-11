<script lang="ts" setup>
import { Button, Checkbox, Dialog, Select } from 'primevue'
import { settings, companies, isShowLastWeekHours } from '@/shared/localData'
</script>

<template>
  <Dialog
    v-model:visible="settings.isOpen"
    modal
    header="Настройки"
    :style="{ width: '25rem' }"
  >
    <div class="feeds input-group input-group--horisontal gap-l">
      <div class="input-group input-group--horisontal gap-s">
        <Checkbox
          v-model="settings.isExtraWeatherMoney"
          inputId="weather"
          name="weather"
          binary
        />
        <label for="weather">Погода</label>
      </div>
      <div
        class="input-group input-group--horisontal gap-s"
        v-if="isShowLastWeekHours"
      >
        <Checkbox
          v-model="settings.isLastWeekHours"
          inputId="last-week-hours"
          name="last-week-hours"
          binary
        />
        <label for="last-week-hours">Отработал 30ч</label>
      </div>
    </div>
    <div
      class="input-group input-group--horisontal input-group--align-center feeds gap-m"
    >
      Я работаю в
      <Select
        class="input-group"
        v-model="settings.company"
        :options="companies"
        placeholder="выбери компанию"
      />
    </div>
    <div class="feeds">
      Я езжу на
      <Button
        :label="settings.isBicycle ? 'велосипеде' : 'электросамокате'"
        size="small"
        severity="secondary"
        @click="settings.isBicycle = !settings.isBicycle"
      />
    </div>
  </Dialog>
</template>
