<template>
  <div
    class="mx-auto w-5/6 bg-white flex items-center justify-center rounded-md shadow-lg fixed top-1/2 left-0 right-0 z-40 transform -translate-y-1/2 sm:max-w-lg"
  >
    <ModalCloseButton></ModalCloseButton>
    <slot></slot>
  </div>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton.vue';
</script>
