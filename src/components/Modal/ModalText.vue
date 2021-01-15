<template>
  <span class="py-24 text-lg">{{ modalText }}</span>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  modalText: String
});
</script>
