<script setup lang="ts">
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { ref } from 'vue'
import { fetchGenres } from '@/features/genres/api'
import { Genre } from '@/features/genres/type'

const genres = await fetchGenres()

const selectedGenre = ref(null)
const newTitle = ref('')
const newExplanation = ref('')
</script>

<template>
  <div>
    <div :class="$style.gap">
      <label :class="$style.container">
        タイトル
        <input :class="$style.border" v-model="newTitle" type="text" />
      </label>
      <label :class="$style.container">
        説明
        <textarea 
           :class="[$style.height,$style.border]" 
           v-model="newExplanation" type="text" />
      </label>
      <label :class="$style.container">
        ジャンル
        <v-select
          :options="genres"
          v-model="selectedGenre"
          label="name"
          :reduce="(option: Genre) => option.id"
          :class="$style.border"
        >
        </v-select>
      </label>
    </div>
  </div>
</template>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.gap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.border {
  border-radius: 6px;
}
.height {
  display: flex;
  flex-direction: column;
  height: 120px;
}
</style>
