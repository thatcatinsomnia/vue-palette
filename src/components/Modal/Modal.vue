<template>
  <div v-if="isShow">
    <TextModal v-if="type === 'text'"></TextModal>
    <SaveModal v-else-if="type === 'save'"></SaveModal>
    <LibraryModal v-else="type === 'library'">></LibraryModal>
  </div>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';
import TextModal from '@/components/Modal/TextModal.vue';
import SaveModal from '@/components/Modal/SaveModal.vue';
import LibraryModal from '@/components/Modal/LibraryModal.vue';

const { isShow, type, closeModal } = useModalContext();

const close = () => {
  closeModal();
};
</script>
