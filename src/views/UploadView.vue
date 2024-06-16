<script setup lang="ts">
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { ref } from 'vue'
import { fetchGenres } from '@/features/genres/api'
import type { Genre } from '@/features/genres/type'
import FileUploader from '@/components/FileUploader.vue'
import { registerSlide } from '@/features/upload/api'
import SlideViewer from '@/components/SlideViewer.vue'
import AButton from '@/components/AButton.vue'
import { useToast } from 'vue-toastification'
import { dataURLToBlob } from '@/lib/blob'

const genres = await fetchGenres()
const toast = useToast()

const selectedGenre = ref(null)
const newTitle = ref('')
const newExplanation = ref('')
const newFile = ref<File | null>(null)
const url = ref('')
const isSending = ref(false)

const handleRegisterSlide = async () => {
  if (selectedGenre.value === null || newFile.value === null) {
    return
  }
  isSending.value = true

  try {
    // 1枚目の画像を取得
    const canvas = document.querySelector('canvas')
    if (!canvas) {
      throw new Error('canvas is undefined')
    }
    const imgSrc = canvas.toDataURL('image/png')

    const blob = dataURLToBlob(imgSrc)
    await registerSlide(
      newTitle.value,
      newExplanation.value,
      selectedGenre.value,
      newFile.value,
      blob
    )

    toast.success('スライドを登録しました')
  } catch (e) {
    if (e instanceof Error) {
      toast.error(`エラーが発生しました: ${e.message}`)
    }
  }
  isSending.value = false
}
</script>

<template>
  <div :class="$style.page">
    <File-uploader v-model:file="newFile" v-model:url="url" />
    <SlideViewer v-if="url !== ''" :slideUrl="url" />
    <div :class="[$style.gap, $style.left]">
      <label :class="$style.container">
        タイトル
        <input :class="$style.border" v-model="newTitle" type="text" />
      </label>
      <label :class="$style.container">
        説明
        <textarea :class="[$style.height, $style.border]" v-model="newExplanation" type="text" />
      </label>
      <label :class="[$style.container]">
        ジャンル
        <v-select
          :options="genres"
          v-model="selectedGenre"
          label="genrename"
          :reduce="(option: Genre) => option.id"
          :class="$style.border"
        >
        </v-select>
      </label>
      <dev :class="$style.moreleft">
        <a-button :disabled="isSending" @click="handleRegisterSlide" :class="$style.button" primary>
          スライドを登録
        </a-button>
      </dev>
    </div>
  </div>
</template>

<style lang="scss" module>
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 20px;
}
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
  border: 1px solid #000000;
  width: 600px;
}
.height {
  display: flex;
  flex-direction: column;
  height: 120px;
}
.genre {
  padding-bottom: 28px;
}
.button {
  border: 1px solid #000000;
  width: 152px;
  height: 47px;
  background-color: #d9d9d9;
  border-radius: 12px;
}
.left {
  padding-left: 80px;
}
.moreleft {
  padding-left: 888px;
}
</style>
