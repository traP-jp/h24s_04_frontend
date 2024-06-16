<script setup lang="ts">
import './globalStyle.scss'
import { RouterView } from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import ErrorBoundary from '@/components/ErrorBoundary.vue'
</script>

<template>
  <TheHeader />
  <main>
    <router-view v-slot="{ Component }">
      <error-boundary>
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
      </error-boundary>
    </router-view>
  </main>
</template>

<style lang="scss" module></style>
