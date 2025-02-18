<script lang="ts" setup>
import router from '@/router'
import { payInfo } from '@/shared/generalData'
import { Button, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const showSticky = () => {
  if (!payInfo.value) return
  toast.add({
    severity: 'info',
    group: 'bc',
    closable: false,
  })
}

const clear = () => {
  toast.removeAllGroups()
  payInfo.value = false
  router.push('/')
}

setTimeout(showSticky, 200)
</script>

<template>
  <Toast position="bottom-center" group="bc">
    <template #message="{ message }">
      <h3 class="toast-message">Обновилась информация об оплате</h3>
      <Button label="Обновить" @click="clear" severity="info" fluid />
    </template>
  </Toast>
</template>

<style>
.toast-message {
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.p-toast-message-content {
  flex-direction: column;
}
</style>
