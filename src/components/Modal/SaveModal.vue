<template>
  <div
    class="px-8 pt-12 pb-6 w-full h-full flex flex-col items-center justify-center"
  >
    <div class="mb-10 w-full flex">
      <div
        v-for="color in colors"
        class="h-12 w-12 flex-1"
        :style="{ backgroundColor: color.hex }"
        :key="color.id"
      ></div>
    </div>
    <div class="w-full relative">
      <input
        type="text"
        class="mb-auto px-3 py-2 w-full border border-gray-300 rounded block focus:outline-none focus:ring-2 ring-indigo-400"
        :class="{
          outline: error.isActive,
          'ring-2': error.isActive,
          'ring-pink-400': error.isActive
        }"
        placeholder="input your color palette..."
        @input="input"
        @keyup.enter="save"
      />
      <transition name="fade">
        <span
          class="absolute left-0 -top-7 text-pink-600"
          v-if="error.isActive"
        >
          {{ error.message }}
        </span>
      </transition>
    </div>

    <div class="mt-5 w-full flex">
      <button
        class="px-4 py-1 flex-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        @click="save"
      >
        Save
      </button>
      <button
        class="ml-3 px-4 py-1 flex-1 text-white bg-gray-500 hover:bg-gray-600 rounded transition-colors duration-500 ease-in-out"
        @click="close"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmit } from 'vue';
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';
import ModalWrapper from '@/components/Modal/ModalWrapper.vue';

const { colors, saveColors } = useColorsContext();

const {
  closeModal,
  isShow,
  setModalType,
  error,
  resetError
} = useModalContext();

let paletteName = ref('');

const input = event => {
  paletteName.value = event.target.value;
  error.isActive = false;
};

const save = () => {
  if (!paletteName.value) {
    error.isActive = true;
    return;
  }

  saveColors(paletteName);
  close();
};

const close = () => {
  resetError();
  closeModal();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 200ms ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
