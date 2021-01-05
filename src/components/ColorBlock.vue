<template>
  <div class="flex-1 text-white text-2xl flex items-center justify-center">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  name: String
});
</script>
