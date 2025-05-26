<script lang="ts" setup>
import router from '@/router'
import { updates, changeUpdatesState } from '@/shared/generalData'
import { Button, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const showSticky = () => {
  if (!updates.value) return
  toast.add({
    severity: 'secondary',
    group: 'bc',
    closable: false,
  })
}

const clear = () => {
  toast.removeAllGroups()
  changeUpdatesState()
  router.push('/')
}

setTimeout(showSticky, 200)
</script>

<template>
  <Toast position="bottom-center" group="bc">
    <template #message>
      <h3 class="toast-message">Обновилась информация об оплате</h3>
      <Button
        label="Ok"
        @click="clear"
        severity="success"
        variant="outlined"
        fluid
      />
    </template>
  </Toast>
</template>

<style>
.toast-message {
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
}

.p-toast-message-content {
  flex-direction: column;
}
</style>
