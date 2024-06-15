<script setup lang="ts">
import { fetchSlideDetail } from '@/features/slideDetail/api'
import UserIcon from '@/components/UserIcon.vue'
import AIcon from '@/components/AIcon.vue'
import { fetchGenres } from '@/features/genres/api'
import type { Genre } from '@/features/genres/type'

const slide = await fetchSlideDetail('1')
const genres = await fetchGenres()
const genre: Genre = genres.find((genre) => genre.id === slide.genre_id) ?? {
  id: '0',
  name: '不明'
}
</script>

<template>
  <div :class="$style.container">
    <h1 :class="$style.h1">{{ slide.title }}</h1>
    <div :class="$style.infoContainer">
      <p>{{ slide.description }}</p>
      <div :class="$style.innerInfoContainer">
        <div :class="$style.meta">
          <time :datetime="slide.posted_at">{{ slide.posted_at }}</time>
          <!--TODO: usernameどうするか決まったら修正-->
          <div :class="$style.user">
            <user-icon user-name="mehm8128" />
            <span>mehm8128</span>
          </div>
        </div>
        <div :class="$style.genre">
          <a-icon name="mdi:label" />
          {{ genre.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 20px;
}
.h1 {
  font-size: 1.5rem;
}
.infoContainer {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.innerInfoContainer {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.meta {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user {
  display: flex;
  align-items: center;
  gap: 4px;
}
.genre {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>