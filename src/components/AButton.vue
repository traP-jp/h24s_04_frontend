<script setup lang="ts">
import AIcon from './AIcon.vue'

withDefaults(
  defineProps<{
    iconName: string
    iconSize?: number
    danger?: boolean
  }>(),
  {
    iconSize: 24,
    danger: false
  }
)
</script>

<template>
  <button :class="$style.button" :data-is-danger="danger">
    <slot />
    <a-icon :name="iconName" :size="iconSize" />
  </button>
</template>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #000;

  &[data-is-danger='true'] {
    color: #ec4949;
    border-color: #ec4949;
  }
}
</style>
