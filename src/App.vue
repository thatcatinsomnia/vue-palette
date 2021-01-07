<template>
  <div class="h-screen flex flex-col">
    <div class="w-full bg-gray-100 flex-1 flex flex-col">
      <ColorBlock
        class="bg-gray-100"
        v-for="(color, i) in palette.randomColors"
        :key="i"
        :color="color"
      />
    </div>

    <div class="h-44 bg-white flex">
      <button class="flex-1">lib</button>
      <button class="flex-1">save</button>
      <button class="flex-1" @click="generateColor">generate</button>
      <button class="flex-1">export</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import ColorBlock from './components/ColorBlock.vue';
import chroma from 'chroma-js';

const palette = reactive({
  size: 4,
  randomColors: []
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

onMounted(() => {
  generateColor();
});
</script>
