<template>
  <div
    class="w-full h-full fixed left-0 top-0 z-10 bg-opacity-80 bg-black flex items-center justify-center"
    @click.self="closeModal"
  >
    <div
      class="w-5/6 bg-white flex items-center justify-center rounded-md shadow-lg relative"
    >
      <ModalCloseButton></ModalCloseButton>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';
import ModalCloseButton from '@/components/Modal/ModalCloseButton.vue';

const { closeModal } = useModalContext();
</script>
