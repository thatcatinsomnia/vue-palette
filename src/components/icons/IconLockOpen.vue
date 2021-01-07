<template>
  <!-- Please refer: https://github.com/shubhamjain/svg-loader -->
  <svg
    width="width"
    height="height"
    stroke="none"
    fill="currentColor"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    preserveAspectRatio="xMidYMid meet"
    data-attributes-set=",xmlns:xlink,xmlns,viewBox,preserveAspectRatio"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
    ></path>
  </svg>
</template>

<script>
import { defineProps } from 'vue';

defineProps({
  width: {
    type: String,
    default: 28
  },
  height: {
    type: String,
    default: 28
  }
});
</script>
