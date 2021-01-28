<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-10"
      @click.self="closeAdjustmentPanel"
      v-if="adjustment.isShow"
    ></div>
  </transition>

  <transition name="fade">
    <div
      class="mx-auto w-40 h-40 sm:w-52 sm:h-52 lg:h-72 lg:w-72 text-center fixed top-0 left-0 right-0 top-1/3 transform -translate-y-1/2 z-20"
      v-if="adjustment.isShow"
    >
      <div
        class="w-full h-full border rounded cursor-pointer"
        :style="{ background: adjustment.color.hex }"
        @click.self="copy"
      ></div>
      <span class="py-3 text-white block cursor-pointer" @click.self="copy">
        {{ adjustment.color.hex.toUpperCase() }}
      </span>
    </div>
  </transition>

  <transition name="slide">
    <div
      class="fixed bottom-0 left-0 right-0 h-56 w-full bg-gray-800 rounded flex flex-col items-center justify-center space-y-2 z-20 md:max-w-2xl md:mx-auto"
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
  </transition>
</template>

<script setup>
import { useAdjustmentContext } from '@/composables/adjustment';
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';
import SliderInput from './UI/SliderInput.vue';

const {
  adjustment,
  closeAdjustmentPanel,
  updateSliderGradient
} = useAdjustmentContext();

const { copyColor } = useColorsContext();
const { openModal, setModalText } = useModalContext();
const sliders = adjustment.sliders;

const copy = () => {
  copyColor(adjustment.color.hex.toUpperCase());
  setModalText('Color copied !! 🎉');
  openModal('text');
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 260ms ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 260ms ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
