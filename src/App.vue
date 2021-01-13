<template>
  <div class="h-screen flex flex-col">
    <div class="w-full flex-1 flex flex-col">
      <ColorBlock
        v-for="(color, i) in palette.randomColors"
        :key="i"
        :color="color"
        @copyHex="copyHex"
      ></ColorBlock>
    </div>

    <div class="h-24 bg-white flex select-none">
      <button class="flex-1">lib</button>
      <button class="flex-1">save</button>
      <button class="flex-1" @click="generateColor">generate</button>
    </div>
  </div>

  <AppModal v-if="modal.isActive" @closeModal="closeModal"></AppModal>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ColorBlock from './components/ColorBlock.vue';
import AppModal from './components/AppModal.vue';
import chroma from 'chroma-js';

const palette = reactive({
  size: 5,
  randomColors: []
});

let modal = reactive({
  timer: null,
  isActive: false
});

const generateColor = () => {
  for (let i = 0; i < palette.size; i++) {
    if (palette.randomColors[i]?.isLock) {
      continue;
    }

    palette.randomColors[i] = {
      isLocked: false,
      hex: chroma.random().hex().toUpperCase()
    };
  }
};

const copyHex = hex => {
  navigator.clipboard.writeText(hex);

  modal.isActive = true;
  modal.timer = setTimeout(closeModal, 3000);
};

const closeModal = () => {
  modal.isActive = false;
  clearInterval(modal.timer);
};

onMounted(() => {
  generateColor();
});
</script>
