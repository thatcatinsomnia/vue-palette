<template>
  <div class="h-full flex flex-col">
    <ColorPalette></ColorPalette>
    <CallToAction></CallToAction>
    <Modal></Modal>
    <AdjustPanel></AdjustPanel>
  </div>
</template>

<script setup>
import { useColorsProvider } from '@/composables/colors';
import { useModalProvider } from '@/composables/modal';
import { useAdjustmentProvider } from '@/composables/adjustment';
import ColorPalette from '@/components/Color/ColorPalette.vue';
import CallToAction from './components/CallToAction.vue';
import AdjustPanel from './components/AdjustPanel.vue';
import Modal from '@/components/Modal/Modal.vue';

useColorsProvider();
useModalProvider();
useAdjustmentProvider();
</script>
