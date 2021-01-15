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
      <button class="flex-1" @click="showLibrary">lib</button>
      <button class="flex-1" @click="showSaveModal">save</button>
      <button class="flex-1" @click="generateColor">generate</button>
    </div>
  </div>

  <modal-wrapper
    v-if="modal.isActive"
    @closeModal="closeModal"
    @saveColor="saveColor"
  >
    <modal-text
      :modal-text="modal.text"
      v-if="modal.type === 'text'"
    ></modal-text>

    <modal-save
      :colors="palette.randomColors"
      @closeModal="closeModal"
      @saveColor="saveColor"
      v-else-if="modal.type === 'save'"
    ></modal-save>

    <modal-library
      :library="library"
      @delete="deletePalette"
      @load="loadPalette"
      v-else
    ></modal-library>
  </modal-wrapper>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import ColorBlock from './components/ColorBlock.vue';
import ModalWrapper from './components/Modal/ModalWrapper.vue';
import ModalText from './components/Modal/ModalText.vue';
import ModalSave from './components/Modal/ModalSave.vue';
import ModalLibrary from './components/Modal/ModalLibrary.vue';
import chroma from 'chroma-js';

let library = reactive([]);

const palette = reactive({
  size: 5,
  randomColors: []
});

let modal = reactive({
  type: '',
  text: '',
  input: '',
  timer: null,
  closeInterval: 3000,
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
  modal.type = 'text';
  modal.text = 'Copied to clipboard ! 📋';

  modal.isActive = true;
  modal.timer = setTimeout(closeModal, modal.closeInterval);
};

const closeModal = () => {
  modal.isActive = false;
  modal.text = '';
  clearInterval(modal.timer);
};

const showSaveModal = () => {
  modal.type = 'save';
  modal.isActive = true;
};

const saveColor = paletteName => {
  const newPalette = {
    name: paletteName,
    colors: palette.randomColors.map(color => color.hex)
  };

  library.push(newPalette);

  localStorage.setItem('vue-palette', JSON.stringify(library));

  modal.type = 'text';
  modal.text = `palette ${paletteName} saved success! 🎨`;
  modal.timer = setTimeout(closeModal, modal.closeInterval);
};

const showLibrary = () => {
  modal.type = 'lib';
  modal.isActive = true;
};

const loadLibrary = () => {
  const palettes = localStorage.getItem('vue-palette');

  if (!palettes) {
    return;
  }

  for (let palette of JSON.parse(palettes)) {
    library.push(palette);
  }
};

const deletePalette = index => {
  library.splice(index, 1);
  localStorage.setItem('vue-palette', JSON.stringify(library));
};

const loadPalette = colors => {
  palette.randomColors = [];

  for (let i = colors.length - 1; i >= 0; i--) {
    palette.randomColors.push({
      isLocked: false,
      hex: colors[i]
    });
  }

  closeModal();
};

onBeforeMount(() => {
  loadLibrary();
});

onMounted(() => {
  generateColor();
});
</script>
