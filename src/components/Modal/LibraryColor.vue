<template>
  <div class="flex">
    <div
      class="px-3 py-5 flex-1 sm:h-20 sm:w-20"
      v-for="color in colors"
      :style="{ backgroundColor: color.hex }"
    ></div>

    <button
      class="ml-6 px-4 py-1 self-center bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 transition-color duration-300 ease-in-out"
      @click="load(paletteId)"
    >
      load
    </button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';

const props = defineProps({
  colors: Array,
  paletteId: Number
});

const { loadPaletteById } = useColorsContext();
const { closeModal } = useModalContext();

const load = id => {
  loadPaletteById(id);
  closeModal();
};
</script>
