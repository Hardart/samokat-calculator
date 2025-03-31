<script lang="ts" setup>
import { Button, Dialog } from 'primevue'
import UserSettings from './UserSettings.vue'
import { useCourierStore } from '@/store/useCourierStore'
import { useAppSettings } from '@/composables/useAppSettings'

const courierStore = useCourierStore()
const { appSettings } = useAppSettings()
</script>

<template>
  <Dialog
    v-model:visible="appSettings.isSettingsOpen"
    :style="{ width: '25rem' }"
    header="Настройки"
    modal
  >
    <UserSettings />

    <div v-if="courierStore.isLogin">
      <Button
        label="выйти из учетной записи"
        severity="secondary"
        size="small"
        fluid
        @click="courierStore.logout"
      />
    </div>
    <div v-else>
      <Button
        fluid
        size="small"
        severity="secondary"
        label="создать учетную запись курьера"
        @click="$router.push({ name: 'registration' })"
      />
      <Button
        fluid
        class="mt-m"
        size="small"
        label="войти"
        severity="success"
        variant="outlined"
        @click="$router.push({ name: 'login' })"
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
}

.settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
