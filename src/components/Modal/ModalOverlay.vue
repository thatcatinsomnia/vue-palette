<template>
  <div
    class="w-full h-full absolute left-0 top-0 z-30 bg-opacity-80 bg-black"
    @click.self="closeModal"
  ></div>
</template>

<script setup>
import { useModalContext } from '@/composables/modal';

const { closeModal } = useModalContext();
</script>
