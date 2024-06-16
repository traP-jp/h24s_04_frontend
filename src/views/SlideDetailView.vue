<script setup lang="ts">
import { deleteSlideDetail, editSlideDetail, fetchSlideDetail } from '@/features/slideDetail/api'
import AIcon from '@/components/AIcon.vue'
import { fetchGenres } from '@/features/genres/api'
import type { Genre } from '@/features/genres/type'
import AButton from '@/components/AButton.vue'
import SlideViewer from '@/components/SlideViewer.vue'
import type { SlideEditRequest } from '@/features/slideDetail/type'
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { useDropzone } from 'vue3-dropzone'
import { useToast } from 'vue-toastification'
import { uploadFile } from '@/features/upload/api'
import { dataURLToBlob } from '@/lib/blob'

const toast = useToast()
const isSending = ref(false)

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const slide = await fetchSlideDetail(id)
const genres = await fetchGenres()
const genre: Genre = genres.find((genre) => genre.id === slide.genre_id) ?? {
  id: '0',
  genrename: '不明'
}

const page = ref(1)

const isEditMode = ref(false)
const editedValue = ref<SlideEditRequest>({
  title: slide.title,
  description: slide.description,
  genre_id: slide.genre_id,
  url: slide.dl_url
})

const handleCancel = () => {
  editedValue.value = {
    title: slide.title,
    description: slide.description,
    genre_id: slide.genre_id,
    url: slide.dl_url
  }
  isEditMode.value = false
}

const handleSave = async () => {
  isSending.value = true
  try {
    await editSlideDetail(id, editedValue.value)
    toast.success('変更を保存しました')
    isEditMode.value = false
  } catch (e) {
    if (e instanceof Error) {
      toast.error(`エラーが発生しました: ${e.message}`)
    }
  }
  isSending.value = false
}
const handleDelete = async () => {
  if (!window.confirm('本当にこのスライドを削除しますか？')) return

  isSending.value = true
  try {
    await deleteSlideDetail(id)
    toast.success('スライドを削除しました')
    router.push('/')
  } catch (e) {
    if (e instanceof Error) {
      toast.error(`エラーが発生しました: ${e.message}`)
    }
  }
  isSending.value = false
}

const onDrop = async (acceptedFiles: File[]) => {
  const file = acceptedFiles[0]

  isSending.value = true
  try {
    // 1枚目の画像を取得
    page.value = 1
    const canvas = document.querySelector('canvas')
    if (!canvas) {
      throw new Error('canvas is undefined')
    }
    const imgSrc = canvas.toDataURL('image/png')

    const blob = dataURLToBlob(imgSrc)
    const { dl_url } = await uploadFile(file, blob)
    editedValue.value.url = dl_url
  } catch (e) {
    if (e instanceof Error) {
      toast.error(`エラーが発生しました: ${e.message}`)
    }
  }
  isSending.value = false
}

const options = reactive({
  multiple: false,
  onDrop,
  accept: '.pdf'
})

const { getRootProps, getInputProps, open } = useDropzone(options)

const handleUpload = async () => {
  open?.()
}

const parseDatetime = (datetime: Date) => {
  const date = new Date(datetime)
  return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.headingContainer">
      <h1 v-if="!isEditMode" :class="$style.h1">{{ slide.title }}</h1>
      <input v-else v-model="editedValue.title" :class="$style.titleInput" />
      <div :class="$style.buttons">
        <template v-if="!isEditMode">
          <a
            :download="`${slide.title}.pdf`"
            :href="`/api/download/${slide.id}`"
            :class="$style.downloadLink"
          >
            <span>ダウンロード</span>
            <a-icon name="mdi:tray-arrow-down" />
          </a>
          <a-button iconName="mdi:pencil" @click="isEditMode = true">スライドの情報を編集</a-button>
          <a-button iconName="mdi:delete" danger :disabled="isSending" @click="handleDelete"
            >スライドを削除</a-button
          >
        </template>
        <template v-else>
          <a-button iconName="mdi:cancel" @click="handleCancel" danger>キャンセル</a-button>
          <a-button iconName="mdi:check" :disabled="isSending" @click="handleSave" primary
            >変更を保存</a-button
          >
        </template>
      </div>
    </div>
    <div :class="$style.infoContainer">
      <p v-if="!isEditMode" :class="$style.description">{{ slide.description }}</p>
      <textarea v-else v-model="editedValue.description" :class="$style.textarea" />
      <div :class="$style.innerInfoContainer">
        <div :class="$style.meta">
          <time :datetime="slide.posted_at">{{ parseDatetime(new Date(slide.posted_at)) }}</time>
        </div>
        <div v-if="!isEditMode" :class="$style.genre">
          <a-icon name="mdi:label" />
          {{ genre.genrename }}
        </div>
        <v-select
          v-else
          :options="genres"
          v-model="editedValue.genre_id"
          label="genrename"
          :reduce="(option: Genre) => option.id"
        >
        </v-select>
      </div>
    </div>
    <div :class="$style.slideViewer">
      <div :class="$style.uploadButtonContainer" v-if="isEditMode">
        <div v-bind="getRootProps()">
          <input v-bind="getInputProps()" />
          <a-button :disabled="isSending" @click="handleUpload" iconName="mdi:tray-arrow-up">
            スライドの再アップロード
          </a-button>
        </div>
      </div>
      <SlideViewer
        :slide-url="`/api/download/${slide.id}`"
        :thumbnail="slide.thumb_url"
        v-model="page"
      />
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
.downloadLink {
  text-decoration: none;
  color: black;

  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #000;

  &:hover {
    background-color: #d9d9d9;
  }
  &:active {
    background-color: #bbbbbb;
  }

  &[data-is-danger='true'] {
    color: #ec4949;
    border-color: #ec4949;

    &:hover {
      background-color: #e5c2c2;
    }
    &:active {
      background-color: #e3a1a1;
    }
  }
}
.uploadButtonContainer {
  display: flex;
  justify-content: flex-end;
}
.description {
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
