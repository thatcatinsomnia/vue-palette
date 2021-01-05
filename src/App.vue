<template>
  <div class="h-screen flex flex-col">
    <div class="w-full bg-blue-900 flex-1 flex">
      <ColorBlock class="bg-red-300">color-1</ColorBlock>
      <ColorBlock class="bg-blue-300">color-2</ColorBlock>
      <ColorBlock class="bg-yellow-300">color-3</ColorBlock>
      <ColorBlock class="bg-green-300">color-4</ColorBlock>
      <ColorBlock class="bg-purple-300">color-5</ColorBlock>
    </div>

    <div class="h-56 bg-white flex">
      <button class="flex-1">lib</button>
      <button class="flex-1">save</button>
      <button class="flex-1">generate</button>
      <button class="flex-1">export</button>
    </div>
  </div>
</template>

<script setup>
import ColorBlock from './components/ColorBlock.vue';
</script>

<style></style>
