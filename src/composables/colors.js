import { toRefs, reactive, inject, provide } from 'vue';
import chroma from 'chroma-js';

const COLOR_CONTEXT = Symbol();
const DEBUG = true;

if (DEBUG) console.log('debug mode is on...');

export function useColorsProvider() {
  const state = reactive({
    size: 5,
    colors: [],
    library: []
  });

  function generateColors() {
    for (let i = 0; i < state.size; i++) {
      if (state.colors[i]?.isLock) {
        continue;
      }

      const hex = chroma.random().hex();
      const hsl = {
        h: chroma(hex).get('hsl.h'),
        s: chroma(hex).get('hsl.s'),
        l: chroma(hex).get('hsl.l')
      };

      state.colors[i] = {
        id: i,
        hex: hex,
        hsl: hsl,
        isLock: false
      };
    }

    if (DEBUG) {
      console.log(
        'generate colors: ' + state.colors.map(color => color.hex).join(', ')
      );
    }
  }

  function copyColor(hex) {
    if (DEBUG) {
      console.log('copy color: ' + hex);
    }

    navigator.clipboard.writeText(hex.toUpperCase());
  }

  function lockColor(id) {
    state.colors[id].isLock = true;

    if (DEBUG) {
      console.log('lock color id: ' + id);
    }
  }

  function unlockColor(id) {
    state.colors[id].isLock = false;

    if (DEBUG) {
      console.log('unlock color id: ' + id);
    }
  }

  function saveColors(paletteName) {
    const colors = state.colors.map(color => {
      return {
        hex: color.hex,
        hsl: color.hsl
      };
    });

    const newPalette = {
      id: new Date().getTime(),
      name: paletteName,
      colors: colors
    };

    state.library.push(newPalette);
    localStorage.setItem('vue-palette', JSON.stringify(state.library));

    if (DEBUG) {
      console.log('save palettes to localstorage');
    }
  }

  function loadLibrary() {
    state.library = [];
    const palettes = localStorage.getItem('vue-palette');

    if (!palettes) {
      return;
    }

    for (let palette of JSON.parse(palettes)) {
      state.library.unshift(palette);
    }

    if (DEBUG) {
      console.log(`load ${JSON.parse(palettes).length} palettes from library`);
    }
  }

  function loadPaletteById(id) {
    const palette = state.library.find(palette => palette.id === id);

    palette.colors.map((color, i) => {
      const hsl = [color.hsl.h, color.hsl.s, color.hsl.l];

      state.colors[i] = {
        id: i,
        isLock: false,
        hex: chroma(hsl, 'hsl').hex(),
        hsl: {
          h: color.hsl.h,
          s: color.hsl.s,
          l: color.hsl.l
        }
      };
    });

    if (DEBUG) {
      console.log(
        `load palette ${palette.name} with: ${palette.colors.map(
          color => color
        )}
        `
      );
    }
  }

  function removePaletteById(id) {
    const newLibrary = state.library.filter(palette => palette.id !== id);

    state.library = newLibrary;
    localStorage.setItem('vue-palette', JSON.stringify(newLibrary));
  }

  // update the hsl first
  // then use hsl to update hex
  // to prevent lost color problem
  function updateColor(color) {
    const { id, hsl } = color;

    state.colors[id].hsl = {
      h: hsl.h,
      s: hsl.s,
      l: hsl.l
    };

    state.colors[id].hex = chroma([hsl.h, hsl.s, hsl.l], 'hsl').hex();

    if (DEBUG) {
      console.log(`update color: ${color.hex} with id: ${color.id}`);
    }
  }

  provide(COLOR_CONTEXT, {
    ...toRefs(state),
    generateColors,
    copyColor,
    lockColor,
    unlockColor,
    saveColors,
    loadLibrary,
    loadPaletteById,
    removePaletteById,
    updateColor
  });
}

export function useColorsContext() {
  const context = inject(COLOR_CONTEXT);

  if (!context) {
    throw new Error('useColorsContext must be used with useColorsProvider');
  }

  return context;
}
