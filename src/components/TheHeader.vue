<script lang="ts" setup>
import { useRoute } from 'vue-router';
import {computed} from 'vue'

const route = useRoute()
const url = computed(()=>route.fullPath)
</script>

<template>
  <header :class="$style.header">
    <router-link to="/" :aria-current="url === '/' ? 'page' : undefined">スライド一覧</router-link>
    <router-link to="/upload" :aria-current="url === '/upload' ? 'page' : undefined">スライドの登録</router-link>
  </header>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 20px;
  background-color: #90bfeb;

  a {
    color: black;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      background-color: #f0f0f0;
    }
    &[aria-current = 'page']{
      background-color: #f0f0f0;
    }
  }
}
</style>
