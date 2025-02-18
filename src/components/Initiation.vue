<script lang="ts" setup>
import router from '@/router'
import { payInfo } from '@/shared/generalData'
import { hoursData } from '@/shared/hoursData'
import { ordersData } from '@/shared/ordersData'
import { Button, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const showSticky = () => {
  if (payInfo.value) return
  toast.add({
    severity: 'warn',
    group: 'bc',
    closable: false,
  })
}

const clear = () => {
  toast.removeAllGroups()
  hoursData.value = null
  ordersData.value = null
  payInfo.value = true
  router.push('/')
}

// setTimeout(showSticky, 200)
</script>

<template>
  <Toast position="bottom-center" group="bc">
    <template #message="{ message }">
      <h3 class="toast-message">Информация о доходах изменилась</h3>
      <Button label="Обновить" @click="clear" severity="warn" fluid />
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
