<script lang="ts" setup>
import { v4 as uuid } from 'uuid'
import { Button } from 'primevue'

import { settings } from '@/shared/localData'
import { resetAllData } from '@/shared/generalData'
import {
  cancelEditShift,
  editShift,
  isEditShift,
  isShiftSaved,
  profitForDay,
  saveShift,
  shiftToEdit,
} from '@/shared/shiftData'
import { formattedIntlDate } from '@/shared/date'

if (!settings.value.userId) settings.value.userId = uuid()

const formattedDate = () =>
  formattedIntlDate(shiftToEdit!.date, { day: '2-digit', month: 'long' })
</script>

<template>
  <div class="sum">
    <p class="sum__title">
      Заработал
      {{ isEditShift ? formattedDate() : 'сегодня' }}
    </p>
    <h3 class="sum__value">{{ profitForDay }} ₽</h3>

    <Button
      label="Изменить"
      class="save-btn"
      fluid
      v-if="isEditShift"
      @click="editShift"
    />
    <Button
      :label="isShiftSaved ? 'Данные за этот день сохранены' : 'Сохранить'"
      class="save-btn"
      fluid
      :disabled="isShiftSaved || profitForDay === 0"
      v-else
      @click="saveShift"
    />

    <Button
      label="Сбросить"
      class="save-btn"
      fluid
      @click="resetAllData"
      v-if="!isEditShift"
      severity="warn"
    />
    <Button
      label="Отменить изменеия"
      class="save-btn"
      fluid
      severity="danger"
      @click="cancelEditShift"
      v-else
    />
  </div>
</template>
