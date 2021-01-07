,
<template>
  <div
    class="flex-1 text-white text-2xl flex items-center justify-center relative"
    :style="{ backgroundColor: color.hex }"
  >
    <h3>{{ color.hex }}</h3>
    <IconLockOpen
      :style="lockIconStyle"
      :width="20"
      :height="20"
      @click="color.isLock = !color.isLock"
      v-if="!color.isLock"
    />

    <IconLockClosed
      :style="lockIconStyle"
      :width="20"
      :height="20"
      @click="color.isLock = !color.isLock"
      v-else
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import IconLockClosed from '@/components/icons/LockClosed.vue';
import IconLockOpen from '@/components/icons/LockOpen.vue';

defineProps({
  color: Object
});

const lockIconStyle = {
  position: 'absolute',
  right: '30px',
  top: '50%',
  transform: 'translateY(-50%)'
};
</script>
