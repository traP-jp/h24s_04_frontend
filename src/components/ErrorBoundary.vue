<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

onErrorCaptured((error: Error) => {
  console.error(error)
  toast.error(error.message)
})
</script>

<template>
  <slot />
</template>
