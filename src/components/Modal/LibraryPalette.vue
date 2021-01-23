<template>
  <div v-for="palette in library" class="mt-5 flex flex-col">
    <div class="flex items-center">
      <span class="text-lg">{{ palette.name }}</span>
      <button
        class="ml-3 px-2 bg-pink-500 text-white text-xs shadow hover:bg-pink-600 transition-color duration-300 ease-in-out"
        @click="remove(palette.id)"
      >
        delete
      </button>
    </div>

    <div class="flex">
      <div
        class="h-12 flex-1"
        v-for="color of palette.colors"
        :style="{ backgroundColor: color.hex }"
      ></div>
      <button
        class="ml-6 px-4 py-1 self-center bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 transition-color duration-300 ease-in-out"
        @click="load(palette.id)"
      >
        load
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';

const { loadPaletteById, removePaletteById } = useColorsContext();
const { closeModal } = useModalContext();

const porps = defineProps({
  library: Array
});

const remove = id => {
  removePaletteById(id);
};

const load = id => {
  loadPaletteById(id);
  closeModal();
};
</script>
