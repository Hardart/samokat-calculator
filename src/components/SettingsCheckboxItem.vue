<script lang="ts" setup>
import { Checkbox } from 'primevue'
import { useId } from 'vue'
const vModel = defineModel({ required: true })
defineProps<{
  label: string
}>()
const id = useId()
</script>

<template>
  <div class="settings__item mt-s">
    <p>
      <label :for="id"> {{ label }}</label>
    </p>
    <p>
      <Checkbox v-model="vModel" :inputId="id" :name="id" binary />
    </p>
  </div>
</template>
