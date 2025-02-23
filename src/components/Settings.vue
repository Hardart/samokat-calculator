<script lang="ts" setup>
import { Button, Dialog } from 'primevue'
import { useCourierStore } from '@/store/useCourierStore'
import { useSettingsStore } from '@/store/useSettingStore'
import SettingsGlobal from './SettingsGlobal/SettingsGlobal.vue'
import UserSettings from './UserSettings.vue'

const settingsStore = useSettingsStore()
const courierStore = useCourierStore()
</script>

<template>
  <Dialog
    v-model:visible="settingsStore.localSettings.isSettingsOpen"
    :style="{ width: '25rem' }"
    header="Настройки"
    modal
  >
    <UserSettings v-if="courierStore.isLogin" />
    <SettingsGlobal v-else />

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
  margin-bottom: 30px;
}

.settings__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
