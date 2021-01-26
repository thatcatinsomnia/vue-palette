<template>
  <div class="absolute right-2 top-1 text-2xl cursor-pointer" @click="close">
    &times;
  </div>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';

const { closeModal, resetError } = useModalContext();

const close = () => {
  closeModal();
  resetError();
};
</script>
