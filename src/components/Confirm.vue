<script lang="ts" setup>
import { Dialog, Button } from 'primevue'
const isOpen = defineModel<boolean>({ required: true })
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Dialog
    v-model:visible="isOpen"
    position="bottom"
    :closable="false"
    content-class="confirm-dialog"
    modal
    maximizable
  >
    <Button
      label="Отменить"
      size="small"
      icon="pi pi-times"
      severity="danger"
      @click="$emit('cancel')"
    />
    <Button
      label="Подвердить"
      size="small"
      icon="pi pi-check"
      @click="$emit('confirm')"
    />
  </Dialog>
</template>

<style>
.confirm-dialog {
  display: flex;
  gap: 20px;
}
</style>
