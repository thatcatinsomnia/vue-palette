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
      <button class="flex-1" @click="showSaveModal">save</button>
      <button class="flex-1" @click="generateColor">generate</button>
    </div>
  </div>

  <ModalBox
    v-if="modal.isActive"
    @closeModal="closeModal"
    @saveColor="saveColor"
  >
    <ModalBodyText
      :modalText="modal.text"
      v-if="modal.type === 'text'"
    ></ModalBodyText>

    <ModalBodySave
      :colors="palette.randomColors"
      @closeModal="closeModal"
      @saveColor="saveColor"
      v-else
    ></ModalBodySave>
  </ModalBox>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ColorBlock from './components/ColorBlock.vue';
import ModalBox from './components/Modal/ModalBox.vue';
import ModalBodyText from './components/Modal/ModalBodyText.vue';
import ModalBodySave from './components/Modal/ModalBodySave.vue';
import chroma from 'chroma-js';

const savedLibrary = reactive([]);

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
  const savePalette = {
    name: paletteName,
    colors: palette.randomColors.map(color => color.hex)
  };

  savedLibrary.push(savePalette);

  localStorage.setItem('vue-palette', JSON.stringify(savedLibrary));

  modal.type = 'text';
  modal.text = `palette ${paletteName} saved success! 🎨`;
  modal.timer = setTimeout(closeModal, modal.closeInterval);
};

onMounted(() => {
  generateColor();
});
</script>
