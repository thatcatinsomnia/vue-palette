<template>
  <div class="px-6 py-6 w-full">
    <div v-if="library.length" class="max-h-96 overflow-x-scroll">
      <div v-for="(palette, i) in library" class="mt-5 flex flex-col">
        <div class="flex items-center">
          <span class="text-lg">{{ palette.name }}</span>
          <button
            class="ml-3 px-2 bg-pink-500 text-white text-xs shadow hover:bg-pink-600 transition-color duration-300 ease-in-out"
            @click="deletePalette(i)"
          >
            delete
          </button>
        </div>

        <div class="flex">
          <div
            class="h-12 flex-1"
            v-for="color of palette.colors"
            :style="{ backgroundColor: color }"
          ></div>
          <button
            class="ml-6 px-4 py-1 self-center bg-indigo-500 text-white rounded shadow hover:bg-indigo-600 transition-color duration-300 ease-in-out"
            @click="loadPalette(palette)"
          >
            load
          </button>
        </div>
      </div>
    </div>

    <div class="py-24 text-center" v-else>No Library ! 📂</div>
  </div>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue';

defineProps({
  library: Array
});

const emit = defineEmit(['delete', 'load']);

const deletePalette = i => {
  emit('delete', i);
};

const loadPalette = palette => {
  emit('load', palette.colors);
};
</script>
