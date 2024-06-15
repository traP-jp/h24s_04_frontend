<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>header</header>
  <main>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <suspense>
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <div>loading...</div>
          </template>
        </suspense>
      </template>
    </router-view>
  </main>
</template>

<style lang="scss" module></style>
