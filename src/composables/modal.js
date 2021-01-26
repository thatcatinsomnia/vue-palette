import { toRefs, reactive, provide, inject } from 'vue';

const MODAL_CONTEXT = Symbol();
const DEBUG = process.env.NODE_ENV === 'development' ? true : false;

console.log('modal debug mode is on...');

export function useModalProvider() {
  const state = reactive({
    type: 'text',
    text: 'DEFAULT MODAL TEXT 🎉',
    input: '',
    timer: null,
    closeInterval: 1500,
    isShow: false
  });

  const error = reactive({
    isActive: false,
    message: 'please your palette name ✏'
  });

  function closeModal() {
    clearInterval(state.timer);
    state.isShow = false;

    if (DEBUG) {
      console.log(`modal close`);
    }
  }

  function openModal(type) {
    state.type = type;
    state.isShow = true;

    if (type === 'text') {
      state.timer = setInterval(closeModal, state.closeInterval);
    }

    if (DEBUG) {
      console.log(`${type.toUpperCase()} modal open`);
    }
  }

  function setModalText(text) {
    state.text = text;

    if (DEBUG) {
      console.log('set modal text to ' + text);
    }
  }

  function resetError() {
    error.isActive = false;
  }

  provide(MODAL_CONTEXT, {
    ...toRefs(state),
    closeModal,
    openModal,
    setModalText,
    error,
    resetError
  });
}

export function useModalContext() {
  const context = inject(MODAL_CONTEXT);

  if (!context) {
    throw new Error('useModalContext must be used with useModalProvider');
  }

  return context;
}
