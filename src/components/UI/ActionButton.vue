<template>
  <div class="w-full h-24 flex flex-col items-center justify-center">
    <button class="w-1/2 flex flex-col items-center justify-center">
      <div class="px-2 py-2 flex justify-center rounded bg-gray-700">
        <slot name="icon"></slot>
      </div>
      <span>
        <slot name="text"></slot>
      </span>
    </button>
  </div>
</template>
