<template>
  <ModalWrapper>
    <div class="px-4 py-24 md:py-32 text-lg text-center">{{ text }}</div>
  </ModalWrapper>
</template>

<script setup>
import ModalWrapper from '@/components/Modal/ModalWrapper.vue';

import { useModalContext } from '@/composables/modal';

const { isShow, closeModal, text } = useModalContext();

const close = () => {
  closeModal();
};
</script>
