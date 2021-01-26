<template>
  <div
    class="w-5/6 bg-white flex items-center justify-center rounded-md shadow-lg fixed top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2"
  >
    <ModalCloseButton></ModalCloseButton>
    <slot></slot>
  </div>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton.vue';
</script>
