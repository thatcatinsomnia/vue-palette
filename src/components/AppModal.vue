<template>
  <div
    class="w-full h-full fixed left-0 top-0 z-10 bg-opacity-80 bg-black flex items-center justify-center"
  >
    <div
      class="w-5/6 h-2/6 bg-white flex items-center justify-center rounded-md shadow-lg relative"
    >
      <div
        class="absolute right-2 top-1 text-2xl cursor-pointer"
        @click="closeModal"
        
      >
        &times;
      </div>
      <span class="text-lg">Copied to clipboard ! 📋</span>
    </div>
  </div>
</template>
<script setup>
import { defineEmit } from 'vue';

const emit = defineEmit(['closeModal']);

const closeModal = () => {
  emit('closeModal');
};
</script>
