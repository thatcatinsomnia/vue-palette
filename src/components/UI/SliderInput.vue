<template>
  <div class="px-8 w-full">
    <span class="text-white"><slot>SLIDER NAME</slot></span>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :type="type"
      class="w-full appearance-none rounded-full"
      :class="{ 'slider-input': true }"
      :style="{ background: gradient }"
      :value="value"
      @input="update"
    />
  </div>
</template>

<script setup>
import { useColorsContext } from '@/composables/colors';
import { useAdjustmentContext } from '@/composables/adjustment';

const props = defineProps({
  gradient: String,
  min: String,
  max: String,
  step: String,
  type: String,
  value: Number
});

const { updateColor } = useColorsContext();

const { adjustment, updateColorWithSlider } = useAdjustmentContext();

const update = event => {
  const type = props.type;
  const value = event.target.value;

  updateColorWithSlider(type, Number(value));
  updateColor(adjustment.color);
};
</script>

<style>
.slider-input {
  outline: none;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: -7px;
  height: 24px;
  width: 8px;
  border: 1px solid #000;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  box-shadow: 1px 1px 2px #000;
  outline: none;
}

.slider-input::-webkit-slider-runnable-track {
  height: 12px;
  outline: none;
}
</style>
