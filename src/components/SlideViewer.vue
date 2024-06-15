<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { ref } from 'vue'
import AIcon from '@/components/AIcon.vue'

defineProps<{
  slideId: string
  thumbnail: string
}>()

const { pdf, pages } = usePDF({
  url: '/slide.pdf', // slideIdからURL生成？
  cMapUrl: '/cmaps/'
})

const currentSlideNum = ref(1)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.viewer">
      <div :class="$style.buttonContainer" data-direction="left">
        <button :class="$style.button" @click="currentSlideNum--" v-if="currentSlideNum !== 1">
          <a-icon name="mdi:arrow-left-circle" :size="48" />
        </button>
      </div>
      <VuePDF :width="841" :height="595" :pdf="pdf" :page="currentSlideNum">
        <img
          v-if="currentSlideNum === 1"
          :width="841"
          :height="595"
          alt="1ページ目"
          :src="thumbnail"
        />
      </VuePDF>
      <div :class="$style.buttonContainer" data-direction="right">
        <button :class="$style.button" @click="currentSlideNum++" v-if="currentSlideNum !== pages">
          <a-icon name="mdi:arrow-right-circle" :size="48" />
        </button>
      </div>
    </div>
    <div>{{ currentSlideNum }}/{{ pages }}</div>
  </div>
</template>

<style module lang="scss">
.container {
  display: flex;
  flex-direction: column;
}
.viewer {
  position: relative;
  height: 600px;
}
.buttonContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 10;
  margin: auto 0;
  height: fit-content;

  &[data-direction='left'] {
    left: 20px;
  }
  &[data-direction='right'] {
    right: 20px;
  }

  display: none;
  .viewer:hover & {
    display: block;
  }
}
</style>
