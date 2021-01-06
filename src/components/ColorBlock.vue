<template>
  <div
    class="flex-1 text-white text-2xl flex items-center justify-center"
    :style="{ backgroundColor: color }"
  >
    {{ color }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  color: String
});
</script>
