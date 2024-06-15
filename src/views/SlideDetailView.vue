<script setup lang="ts">
import { editSlideDetail, fetchSlideDetail } from '@/features/slideDetail/api'
import UserIcon from '@/components/UserIcon.vue'
import AIcon from '@/components/AIcon.vue'
import { fetchGenres } from '@/features/genres/api'
import type { Genre } from '@/features/genres/type'
import AButton from '@/components/AButton.vue'
import SlideViewer from '@/components/SlideViewer.vue'
import type { SlideEditRequest } from '@/features/slideDetail/type'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const route = useRoute()
const id = route.params.id as string

const slide = await fetchSlideDetail(id)
const genres = await fetchGenres()
const genre: Genre = genres.find((genre) => genre.id === slide.genre_id) ?? {
  id: '0',
  name: '不明'
}

const isEditMode = ref(false)
const editedValue = ref<SlideEditRequest>({
  title: slide.title,
  description: slide.description,
  genre_id: slide.genre_id
})

const handleCancel = () => {
  editedValue.value = {
    title: slide.title,
    description: slide.description,
    genre_id: slide.genre_id
  }
  isEditMode.value = false
}

const handleSave = async () => {
  await editSlideDetail(id, editedValue.value)
  isEditMode.value = false
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.headingContainer">
      <h1 v-if="!isEditMode" :class="$style.h1">{{ slide.title }}</h1>
      <input v-else v-model="editedValue.title" :class="$style.titleInput" />
      <div :class="$style.buttons">
        <template v-if="!isEditMode">
          <a-button iconName="mdi:tray-arrow-down">ダウンロード</a-button>
          <a-button iconName="mdi:pencil" @click="isEditMode = true">スライドを編集</a-button>
          <a-button iconName="mdi:delete" danger>スライドを削除</a-button>
        </template>
        <template v-else>
          <a-button iconName="mdi:cancel" @click="handleCancel" danger>キャンセル</a-button>
          <a-button iconName="mdi:check" @click="handleSave">変更を保存</a-button>
        </template>
      </div>
    </div>
    <div :class="$style.infoContainer">
      <p v-if="!isEditMode">{{ slide.description }}</p>
      <textarea v-else v-model="editedValue.description" :class="$style.textarea" />
      <div :class="$style.innerInfoContainer">
        <div :class="$style.meta">
          <time :datetime="slide.posted_at">{{ slide.posted_at }}</time>
          <!--TODO: usernameどうするか決まったら修正-->
          <div :class="$style.user">
            <user-icon user-name="mehm8128" />
            <span>mehm8128</span>
          </div>
        </div>
        <div v-if="!isEditMode" :class="$style.genre">
          <a-icon name="mdi:label" />
          {{ genre.name }}
        </div>
        <v-select
          v-else
          :options="genres"
          v-model="editedValue.genre_id"
          label="name"
          :reduce="(option: Genre) => option.id"
        >
        </v-select>
      </div>
    </div>
    <div :class="$style.slideViewer">
      <SlideViewer />
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
.headingContainer {
  display: flex;
  gap: 12px;
}
.h1 {
  font-size: 1.5rem;
  flex: 1;
}
.buttons {
  display: flex;
  gap: 8px;
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
.slideViewer {
  width: fit-content;
  margin: 0 auto;
}

.titleInput {
  flex: 1;
  border-radius: 6px;
  border: 1px solid #000000;
  padding: 0 8px;
}
.textarea {
  height: 120px;
  border-radius: 6px;
  border: 1px solid #000000;
  padding: 8px;
}
</style>
