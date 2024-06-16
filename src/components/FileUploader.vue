<script lang="ts" setup>
import { reactive } from 'vue'
import { useDropzone } from 'vue3-dropzone'
import AIcon from '@/components/AIcon.vue'

function onDrop(acceptedFiles: File[]) {
  const file = acceptedFiles[0]
  fileModel.value = file
  const url = URL.createObjectURL(file)
  urlModel.value = url
}

const options = reactive({
  multiple: false,
  onDrop,
  accept: '.pdf'
})

const { getRootProps, getInputProps } = useDropzone(options)

const fileModel = defineModel<File | null>('file', { required: true })
const urlModel = defineModel<string>('url', { required: true })
</script>

<template>
  <div :class="[$style.space, $style.left]">
    <div :class="$style.word">
      <label for="upload">スライドの登録</label>
      <div v-bind="getRootProps()" :class="[$style.cursor, $style.box]">
        <input v-bind="getInputProps()" id="upload" />
        <div :class="$style.upload">
          <a-icon name="mdi:tray-arrow-up" :class="$style.icon" />
          <p>アップロード</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.cursor {
  cursor: pointer;
}
.icon {
  height: 80px;
  width: 80px;
}
.word {
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 20px;
}
.box {
  height: 280px;
  width: 500px;
  border-radius: 16px;
  border: 2px dashed #90bfeb;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}
.space {
  padding-bottom: 20px;
}
.left {
  padding-left: 80px;
}
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
