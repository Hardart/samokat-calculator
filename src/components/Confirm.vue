<script lang="ts" setup>
import { Dialog, Button } from 'primevue'
const isOpen = defineModel<boolean>({ required: true })
const emit = defineEmits(['confirm', 'cancel'])
const onConfirm = () => {
  emit('confirm')
  isOpen.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="isOpen"
    position="bottom"
    :closable="false"
    content-class="confirm-dialog"
    modal
  >
    <Button
      label="Отменить"
      size="small"
      icon="pi pi-times"
      severity="danger"
      @click="isOpen = false"
    />
    <Button
      label="Подвердить"
      size="small"
      icon="pi pi-check"
      @click="onConfirm"
    />
  </Dialog>
</template>

<style>
.confirm-dialog {
  display: flex;
  gap: 20px;
}
</style>
