<template>
  <ModalWrapper>
    <div class="px-6 py-6 w-full">
      <div class="max-h-96 overflow-y-scroll">
        <transition-group name="palette">
          <LibraryPalette
            v-for="palette in library"
            :key="palette.id"
            :palette="palette"
          ></LibraryPalette>
        </transition-group>
      </div>

      <transition name="fade" appear mode="out-in">
        <div class="py-24 text-center" v-if="!library.length">
          No Library ! 📂
        </div>
      </transition>
    </div>
  </ModalWrapper>
</template>

<script setup>
import { useColorsContext } from '@/composables/colors';
import ModalWrapper from '@/components/Modal/ModalWrapper.vue';
import LibraryPalette from '@/components/Modal/LibraryPalette.vue';

const { library } = useColorsContext();
</script>

<style scoped>
.palette-move {
  transition: all 450ms ease;
}

.palette-enter-active,
.palette-leave-active {
  position: absolute;
  transition: all 500ms ease-in-out;
}
.palette-enter-from,
.palette-leave-to {
  transform: translateY(300px) rotate(20deg);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
