<template>
  <transition name="fade" appear>
    <ModalOverlay v-if="isShow"></ModalOverlay>
  </transition>

  <transition name="slide" appear>
    <template v-if="isShow">
      <TextModal v-if="type === 'text'"></TextModal>
      <SaveModal v-else-if="type === 'save'"></SaveModal>
      <LibraryModal v-else="type === 'library'"></LibraryModal>
    </template>
  </transition>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';
import ModalOverlay from '@/components/Modal/ModalOverlay.vue';
import TextModal from '@/components/Modal/TextModal.vue';
import SaveModal from '@/components/Modal/SaveModal.vue';
import LibraryModal from '@/components/Modal/LibraryModal.vue';

const { isShow, type } = useModalContext();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 300ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 300ms ease-out 50ms;
}

/* 
translate both x and y -50% to get the correct position
because the modal has translate(-50%, -50%) at initial state
*/
.slide-enter-from,
.slide-leave-to {
  transform: translateY(calc(-50% - 70px));
  opacity: 0;
}
</style>
