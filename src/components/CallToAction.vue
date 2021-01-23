<template>
  <div class="h-24 bg-white select-none flex">
    <ActionButton @click="showLibraryModal">
      <template v-slot:icon>
        <IconLibrary />
      </template>
      <template v-slot:text>Library</template>
    </ActionButton>

    <ActionButton @click="showSaveModal">
      <template v-slot:icon><IconSave /></template>
      <template v-slot:text>Save</template>
    </ActionButton>

    <ActionButton @click="refreshColor">
      <template v-slot:icon>
        <IconRefresh />
      </template>
      <template v-slot:text>Refresh</template>
    </ActionButton>
  </div>
</template>

<script setup>
import { useColorsContext } from '@/composables/colors';
import { useModalContext } from '@/composables/modal';
import IconSave from '@/components/Icons/IconSave.vue';
import IconLibrary from '@/components/Icons/IconLibrary.vue';
import IconRefresh from '@/components/Icons/IconRefresh.vue';
import ActionButton from '@/components/UI/ActionButton.vue';

const {
  generateColors,
  loadLibrary,
  cacheAdjustmentColorById
} = useColorsContext();

const { openModal, setModalType } = useModalContext();

const showLibraryModal = () => {
  loadLibrary();
  openModal('library');
};

const showSaveModal = () => {
  openModal('save');
};

const refreshColor = () => {
  generateColors();
};
</script>
