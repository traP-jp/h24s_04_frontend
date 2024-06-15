<script setup lang="ts">
import AIcon from './AIcon.vue'

withDefaults(
  defineProps<{
    iconName: string
    iconSize?: number
    danger?: boolean
  }>(),
  {
    iconSize: 20,
    danger: false
  }
)
</script>

<template>
  <button :class="$style.button" :data-is-danger="danger">
    <span>
      <slot />
    </span>
    <a-icon :name="iconName" :size="iconSize" />
  </button>
</template>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #000;

  &:hover {
    background-color: #d9d9d9;
  }
  &:active {
    background-color: #bbbbbb;
  }

  &[data-is-danger='true'] {
    color: #ec4949;
    border-color: #ec4949;

    &:hover {
      background-color: #e5c2c2;
    }
    &:active {
      background-color: #e3a1a1;
    }
  }
}
</style>
