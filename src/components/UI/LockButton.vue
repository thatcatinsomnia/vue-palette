<template>
  <IconLockClosed
    class="cursor-pointer"
    :style="lockStyle"
    @click="unlock"
    v-if="isLock"
  >
  </IconLockClosed>
  <IconLockOpen
    class="cursor-pointer"
    :style="lockStyle"
    @click="lock"
    v-else
  ></IconLockOpen>
</template>

<script setup>
import { defineProps, onBeforeUpdate } from 'vue';
import { useColorsContext } from '@/composables/colors';
import IconLockClosed from '@/components/Icons/IconLockClosed.vue';
import IconLockOpen from '@/components/Icons/IconLockOpen.vue';

const props = defineProps({
  id: Number,
  isLock: Boolean
});

const lockStyle = {
  position: 'absolute',
  right: '10%',
  top: '50%',
  transform: 'translateY(-50%)'
};

const { lockColor, unlockColor } = useColorsContext();

const lock = () => {
  lockColor(props.id);
};

const unlock = () => {
  unlockColor(props.id);
};
</script>
