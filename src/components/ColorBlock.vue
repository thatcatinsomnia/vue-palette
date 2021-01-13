,
<template>
  <div
    class="flex-1 text-white text-xl flex items-center justify-center relative"
    :style="{ backgroundColor: color.hex }"
  >
    <h3 class="cursor-pointer select-none" @click="copyHex">
      {{ color.hex }}
    </h3>

    <IconLockOpen
      :style="lockIconStyle"
      :width="20"
      :height="20"
      class="cursor-pointer"
      @click="color.isLock = !color.isLock"
      v-if="!color.isLock"
    />

    <IconLockClosed
      :style="lockIconStyle"
      :width="20"
      :height="20"
      class="cursor-pointer"
      @click="color.isLock = !color.isLock"
      v-else
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmit } from 'vue';
import IconLockClosed from '@/components/icons/IconLockClosed.vue';
import IconLockOpen from '@/components/icons/IconLockOpen.vue';

const props = defineProps({
  color: Object
});

const emit = defineEmit(['copyHex']);

const lockIconStyle = {
  position: 'absolute',
  right: '30px',
  top: '50%',
  transform: 'translateY(-50%)'
};

const copyHex = event => {
  const hex = event.target.textContent;
  emit('copyHex', hex);
};
</script>
