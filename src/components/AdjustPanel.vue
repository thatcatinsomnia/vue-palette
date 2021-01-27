<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60"
    @click.self="closeAdjustmentPanel"
    v-if="adjustment.isShow"
  ></div>

  <div
    class="fixed bottom-0 left-0 h-48 w-full bg-gray-800 flex flex-col items-center justify-center space-y-2"
    v-if="adjustment.isShow"
  >
    <div
      class="px-2 absolute right-2 top-2 text-white cursor-pointer"
      @click.self="closeAdjustmentPanel"
    >
      &times;
    </div>

    <SliderInput v-for="slider of sliders" :slider="slider">
      {{ slider.title }}
    </SliderInput>
  </div>
</template>

<script setup>
import { useAdjustmentContext } from '@/composables/adjustment';
import SliderInput from './UI/SliderInput.vue';

const {
  adjustment,
  closeAdjustmentPanel,
  updateSliderGradient
} = useAdjustmentContext();

const sliders = adjustment.sliders;
</script>
