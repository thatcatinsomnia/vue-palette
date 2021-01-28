<template>
  <div
    class="flex-1 text-xl flex items-center justify-center relative"
    :class="textColorClass"
    :style="{ backgroundColor: color.hex }"
  >
    <h3 class="cursor-pointer select-none" @click="copyHex">
      {{ color.hex.toUpperCase() }}
    </h3>

    <div
      class="flex items-center absolute right-1/8 lg:flex-col lg:right-auto lg:bottom-1/5"
    >
      <IconAdjustment
        class="cursor-pointer mr-4 lg:mr-0 lg:mb-12"
        @click="adjust(color)"
      ></IconAdjustment>

      <LockButton :id="color.id" :isLock="color.isLock"></LockButton>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onBeforeUpdate, computed } from 'vue';

import LockButton from '@/components/UI/LockButton.vue';
import IconAdjustment from '@/components/Icons/IconAdjustment.vue';
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';
import { useAdjustmentContext } from '@/composables/adjustment';

const { copyColor } = useColorsContext();
const { isShow, openModal, setModalText } = useModalContext();
const {
  openAdjustmentPanel,
  updateSliderPosition,
  initialAdjustmentColor
} = useAdjustmentContext();

const props = defineProps({
  color: Object
});

const textColorClass = computed(() => {
  return props.color.luminance > 0.5 ? 'text-gray-700' : 'text-white';
});

const adjustmentIconStyle = {
  position: 'absolute',
  right: '20%',
  top: '50%',
  transform: 'translateY(-50%)'
};

const copyHex = () => {
  setModalText('Color copied !! 🎉');
  openModal('text');
  copyColor(props.color.hex);
};

const adjust = color => {
  initialAdjustmentColor(color);
  updateSliderPosition();
  openAdjustmentPanel();
};
</script>
