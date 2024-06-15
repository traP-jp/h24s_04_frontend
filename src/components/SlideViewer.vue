<script setup lang="ts">
import { VuePDF, usePDF } from '@tato30/vue-pdf'
import { ref } from 'vue'
import AIcon from '@/components/AIcon.vue'

const props = defineProps<{
  slideUrl: string
  thumbnail?: string
}>()

const { pdf, pages } = usePDF({
  url: props.slideUrl,
  cMapUrl: '/cmaps/'
})

const currentSlideNum = ref(1)
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.viewer">
      <div :class="$style.buttonContainer" data-direction="left">
        <button
          :class="$style.button"
          @click="currentSlideNum--"
          v-if="currentSlideNum !== 1"
          data-direction="left"
        >
          <a-icon name="mdi:arrow-left-circle" :size="48" />
        </button>
      </div>
      <VuePDF :width="841" :height="595" :pdf="pdf" :page="currentSlideNum">
        <img
          v-if="currentSlideNum === 1 && thumbnail !== undefined"
          :width="841"
          :height="595"
          alt="1ページ目"
          :src="thumbnail"
        />
      </VuePDF>
      <div :class="$style.buttonContainer" data-direction="right">
        <button
          :class="$style.button"
          @click="currentSlideNum++"
          v-if="currentSlideNum !== pages"
          data-direction="right"
        >
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
  height: 100%;
  width: 50%;

  &[data-direction='left'] {
    left: 0;
  }
  &[data-direction='right'] {
    right: 0;
  }

  display: none;
  .viewer:hover & {
    display: block;
  }
}
.button {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  &[data-direction='left'] {
    padding-left: 20px;
    justify-content: flex-start;
  }
  &[data-direction='right'] {
    padding-right: 20px;
    justify-content: flex-end;
  }
}
</style>
