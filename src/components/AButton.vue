<script setup lang="ts">
import AIcon from './AIcon.vue'

withDefaults(
  defineProps<{
    iconName?: string
    iconSize?: number
    primary?: boolean
    danger?: boolean
  }>(),
  {
    iconSize: 20,
    primary: false,
    danger: false
  }
)
</script>

<template>
  <button :class="$style.button" :data-is-danger="danger" :data-is-primary="primary">
    <span>
      <slot />
    </span>
    <a-icon v-if="iconName !== undefined" :name="iconName" :size="iconSize" />
  </button>
</template>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #000;

  &:not(:disabled){
    &:hover {
      background-color: #d9d9d9;
    }
    &:active {
      background-color: #bbbbbb;
    }
  }


  &[data-is-primary='true'] {
    background-color: #90bfeb;
    border: none;
    
    &:not(:disabled){
      &:hover {
        background-color: #7bb3e7;
      }
      &:active {
        background-color: #459aea;
      }
    }
  }

  &[data-is-danger='true'] {
    color: #ec4949;
    border-color: #ec4949;
    &:not(:disabled){
      &:hover {
        background-color: #e5c2c2;
      }
      &:active {
        background-color: #e3a1a1;
      }
    }
  }
}
</style>
