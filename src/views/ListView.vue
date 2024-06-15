<script setup lang="ts">
//import { ref, computed } from 'vue'
import { fetchSlide } from '@/features/list/api'
import type { Slide } from '@/features/list/type'
import { fetchGenres } from '@/features/genres/api'
import type { Genre } from '@/features/genres/type'

const datalist = await fetchSlide()
const genres = await fetchGenres()

const idToGenre = (slide: Slide) => {
  const genre: Genre = genres.find((genre) => genre.id === slide.genre_id) ?? {
    id: '0',
    name: '不明'
  }
  return genre.name
}
</script>

<template>
  <div :class="$style.page">
    <h1 :class="$style.toptitle">スライド一覧</h1>
    <div>
      <!-- <p>登録日で昇順ソート</p> -->
    </div>
    <ul :class="$style.container">
      <li v-for="data in datalist" :key="data.title" :class="$style.slide">
        <div>
          <img src="/slide.png" alt="スライド" :class="$style.image" />
        </div>
        <div :class="$style.letter">
          <div :class="$style.name">
            <div :class="$style.title">{{ data.title }}</div>
            <div :class="$style.desc">{{ data.description }}</div>
          </div>
          <div :class="$style.genre">{{ idToGenre(data) }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" module>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 100px;
}
.toptitle {
  font-size: 24px;
}
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  list-style: none;
}
.slide {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px 16px;
  border: 1px solid #000000;
  border-radius: 16px;
  width: 292px;
  height: 344px;
}
.image {
  width: 260px;
  height: 146px;
  object-fit: contain;
  border-radius: 8px;
}
.letter {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.name {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  color: #000000;
}
.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 16px;
  color: #8d8d8d;
  word-break: break-all;
}
.genre {
  font-size: 16px;
  color: #000000;
}
</style>
