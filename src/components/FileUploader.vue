<script lang="ts" setup>
import { reactive } from 'vue'
import { useDropzone } from 'vue3-dropzone'
import type { FileRejectReason } from 'vue3-dropzone'
import AIcon from '@/components/AIcon.vue'

function onDrop(acceptedFiles: File[], rejectReasons: FileRejectReason[]) {
  console.log('acceptedFiles', acceptedFiles)
  console.log('rejectReasons', rejectReasons)
  const file = acceptedFiles[0]
  model.value = file
}

const options = reactive({
  multiple: false,
  onDrop,
  accept: '.pdf'
})

const { getRootProps, getInputProps, isDragActive, isFocused, isDragReject, open } =
  useDropzone(options)

const model = defineModel<File>({ required: true })
</script>

<template>
  <div :class="$style.space">
    <label :class="$style.word">
      スライドの登録
      <div v-bind="getRootProps()" :class="[$style.cursor, $style.box]">
        <input v-bind="getInputProps()" />
        <div>
          <a-icon name="mdi:tray-arrow-up" :class="$style.icon" />
          <p>アップロード</p>
        </div>
      </div>
    </label>
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
  border: 1px solid #000000;
  background-color: #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.space {
  padding-bottom: 20px;
}
</style>
