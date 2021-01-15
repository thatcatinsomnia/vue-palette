<template>
  <div
    class="px-8 pt-12 pb-6 w-full h-full flex flex-col items-center justify-center"
  >
    <div class="mb-3 w-full flex">
      <div
        v-for="(color, i) in colors"
        class="h-12 w-12 flex-1"
        :style="{ backgroundColor: color.hex }"
        :key="i"
      ></div>
    </div>

    <input
      type="text"
      class="mb-auto px-3 py-2 w-full border border-gray-300 rounded block focus:outline-none focus:ring-2 ring-indigo-400"
      placeholder="input your color palette..."
      v-model="paletteName"
    />

    <div class="mt-6 w-full flex">
      <button
        class="px-4 py-1 flex-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors duration-300 ease-in-out"
        @click="saveColor"
      >
        Save
      </button>
      <button
        class="ml-3 px-4 py-1 flex-1 text-white bg-gray-500 hover:bg-gray-600 rounded transition-colors duration-500 ease-in-out"
        @click="closeModal"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmit } from 'vue';

let paletteName = ref('');

defineProps({
  colors: Array
});

const emit = defineEmit(['saveColor', 'closeModal']);

const saveColor = () => {
  if (!paletteName.value) return;
  emit('saveColor', paletteName.value);
};

const closeModal = () => {
  emit('closeModal');
};
</script>
