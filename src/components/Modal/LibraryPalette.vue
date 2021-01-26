<template>
  <div class="mt-5 flex flex-col">
    <div class="flex items-center">
      <span class="text-lg">{{ palette.name }}</span>
      <button
        class="ml-3 px-2 bg-pink-500 text-white text-xs shadow hover:bg-pink-600 transition-color duration-300 ease-in-out"
        @click="remove(palette.id)"
      >
        delete
      </button>
    </div>

    <LibraryColor
      :colors="palette.colors"
      :paletteId="palette.id"
    ></LibraryColor>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';
import LibraryColor from '@/components/Modal/LibraryColor.vue';

const { library, removePaletteById } = useColorsContext();
const { openModal } = useModalContext();

const porps = defineProps({
  palette: Object
});

const remove = id => {
  removePaletteById(id);
};
</script>
