<template>
  <ModalWrapper>
    <div class="px-6 py-6 w-full">
      <div v-if="library.length" class="max-h-96 overflow-x-scroll">
        <LibraryPalette :library="library"></LibraryPalette>
      </div>

      <div class="py-24 text-center" v-else>No Library ! 📂</div>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { useColorsContext } from '@/composables/colors';
import ModalWrapper from '@/components/Modal/ModalWrapper.vue';
import LibraryPalette from '@/components/Modal/LibraryPalette.vue';

const { library } = useColorsContext();

console.log(library);
</script>
