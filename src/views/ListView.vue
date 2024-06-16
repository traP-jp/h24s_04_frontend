<script setup lang="ts">
import { ref } from 'vue'
import vSelect from 'vue-select'
import SlideList from '@/components/SlideList.vue'
import AIcon from '@/components/AIcon.vue'
import 'vue-select/dist/vue-select.css'
import { fetchGenres } from '@/features/genres/api'
import type { Genre } from '@/features/genres/type'

export type SortType = 'ASC' | 'DESC'

const ascStr = '登録日で昇順ソート'
const descStr = '登録日で降順ソート'
const genres = await fetchGenres()

const selectedGenre = ref<string | null>(null)
const selectedTitle = ref('')
const sort = ref<SortType>('DESC')
const sortStr = ref(ascStr)

const changeSort = () => {
  if (sort.value === 'ASC') {
    sort.value = 'DESC'
    sortStr.value = ascStr
  } else {
    sort.value = 'ASC'
    sortStr.value = descStr
  }
}
</script>

<template>
  <div :class="$style.page">
    <h1 :class="$style.toptitle">スライド一覧</h1>
    <div :class="$style.search">
      <!-- <div>
        <v-select
          :options="genres"
          v-model="selectedGenre"
          label="genrename"
          placeholder="ジャンルを選択"
          :reduce="(option: Genre) => option.id"
          :class="$style.search_genre"
        >
        </v-select>
      </div>
      <div>
        <input
          type="text"
          v-model="selectedTitle"
          placeholder="タイトルで検索"
          :class="$style.search_title"
        />
      </div> -->
      <div>
        <button @click="changeSort" :class="$style.sort">
          {{ sortStr }}
          <div v-if="sortStr === ascStr"><a-icon name="mdi:sort-ascending" /></div>
          <div v-if="sortStr === descStr"><a-icon name="mdi:sort-descending" /></div>
        </button>
      </div>
    </div>
    <suspense>
      <template #default>
        <!-- <SlideList
          :key="[selectedTitle, selectedGenre, sort].join()"
          :selectedTitle="selectedTitle"
          :selectedGenre="selectedGenre"
          :sort="sort"
        /> -->
        <SlideList 
          :key="[sort].join()"
          :sort="sort"/>
      </template>
      <template #fallback> loading... </template>
    </suspense>
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
.search {
  display: flex;
  flex-direction: row-reverse;
  gap: 24px;
  align-items: baseline;

  @media (width < 768px) {
    flex-direction: column-reverse;
    gap: 13px;
  }
}
.sort {
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 184px;
  height: 33px;
  padding: 4px;
  border-radius: 4px;
  border: 1px dotted;
  background: #ffffff;

  &:hover {
    background-color: #efefef;
  }
  &:active {
    background-color: #dedede;
  }
}
.search_title {
  width: 184px;
  height: 35px;
  font-size: 16px;
  border-radius: 8px;
  padding-left: 12px;
  border: 1px solid;
}
.search_genre {
  width: 184px;
  height: 43px;
  font-size: 16px;
  border-radius: 8px;

  /**TODO: placeholderだけに設定 */
  color: #8d8d8d;
}
</style>
