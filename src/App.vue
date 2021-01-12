<template>
  <div class="h-screen flex flex-col">
    <div class="w-full bg-gray-100 flex-1 flex flex-col">
      <ColorBlock
        class="bg-gray-100"
        v-for="(color, i) in palette.randomColors"
        :key="i"
        :color="color"
        @onCopyHex="onCopyHex"
      />
    </div>

    <div class="h-44 bg-white flex select-none">
      <button class="flex-1">lib</button>
      <button class="flex-1">save</button>
      <button class="flex-1" @click="generateColor">generate</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, defineEmit } from 'vue';
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

const onCopyHex = hex => {
  navigator.clipboard.writeText(hex);
  alert('copy success');
};

defineEmit(['copyHex']);
onMounted(() => {
  generateColor();
});
</script>
