<template>
  <div class="w-full flex-1 flex flex-col">
    <ColorItem
      v-for="color in colors"
      :key="color.id"
      :color="color"
    ></ColorItem>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useColorsContext } from '@/composables/colors';
import ColorItem from '@/components/Color/ColorItem.vue';

const { library, colors, generateColors } = useColorsContext();

onMounted(() => {
  generateColors();
});
</script>
