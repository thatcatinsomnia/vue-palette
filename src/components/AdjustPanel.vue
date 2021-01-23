<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10"
    @click.self="closeAdjustmentPanel"
    v-if="adjustment.isShow"
  >
    <div
      class="fixed bottom-0 left-0 h-48 w-full bg-gray-800 flex flex-col items-center justify-center space-y-2"
    >
      <div
        class="px-2 absolute right-2 top-2 text-white cursor-pointer"
        @click.self="closeAdjustmentPanel"
      >
        &times;
      </div>

      <SliderInput
        min="0"
        max="360"
        step="1"
        :value="slider.hue"
        :gradient="gradient.hue"
        :type="'hue'"
      >
        Hue
      </SliderInput>

      <SliderInput
        min="0"
        max="1"
        step="0.01"
        :value="slider.saturation"
        :gradient="gradient.saturation"
        :type="'saturation'"
      >
        Saturation
      </SliderInput>

      <SliderInput
        min="0"
        max="1"
        step="0.01"
        :value="slider.brightness"
        :gradient="gradient.brightness"
        :type="'brightness'"
      >
        Brightness
      </SliderInput>
    </div>
  </div>
</template>

<script setup>
import { reactive, onBeforeUpdate } from 'vue';
import { useAdjustmentContext } from '@/composables/adjustment';
import SliderInput from './UI/SliderInput.vue';
import chroma from 'chroma-js';

const {
  adjustment,
  closeAdjustmentPanel,
  updateSliderGradient
} = useAdjustmentContext();

const gradient = adjustment.gradient;
const slider = adjustment.slider;

// updateBrightnessGradient();
// updateBrightnessGradient();
onBeforeUpdate(() => {
  updateSliderGradient();
  // updateBrightnessGradient();
  // initialBrightnessGradient();
  // initialSaturationGradient();
});
</script>
