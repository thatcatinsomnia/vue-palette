import { reactive, provide, inject } from 'vue';
import chroma from 'chroma-js';

const ADJUSTMENT_CONTEXT = Symbol();
const DEBUG = process.env.NODE_ENV === 'development' ? true : false;

export function useAdjustmentProvider() {
  const adjustment = reactive({
    isShow: false,
    color: {},
    sliders: {
      hue: {
        title: 'Hue',
        type: 'hue',
        min: 0,
        max: 360,
        step: 1,
        value: 0,
        gradient:
          'linear-gradient(to right, #FF0000, #FFFF00, #00FF00, #00FFFF, #0000FF, #FF00FF, #FF0000)'
      },
      saturation: {
        title: 'Saturation',
        type: 'saturation',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        gradient: ''
      },
      brightness: {
        title: 'Brightness',
        type: 'brightness',
        min: 0,
        max: 1,
        step: 0.01,
        value: 0,
        gradient: ''
      }
    },
    brightness: {
      start: '#000',
      end: '#fff',
      mid: null,
      scale: null
    },
    saturation: {
      zero: null,
      full: null,
      scale: null
    }
  });

  function initialAdjustmentColor(color) {
    if (DEBUG) console.log(`init color adjust color: ${color.hex}`);

    const [hue, saturation, brightness] = color.hsl;

    adjustment.color = {
      id: color.id,
      hex: color.hex,
      hsl: [hue, saturation, brightness]
    };

    updateSliderGradient();
  }

  function openAdjustmentPanel() {
    if (DEBUG) {
      console.log('open adjustment panel');
    }

    adjustment.isShow = true;
  }

  function closeAdjustmentPanel() {
    if (DEBUG) {
      console.log('close adjustment');
    }

    adjustment.isShow = false;
  }

  function getGradientStyle(colors) {
    // dont add ; on the end
    return `linear-gradient(to right, ${colors.join(', ')})`;
  }

  function updateSliderGradient() {
    if (DEBUG) {
      console.log(`update gradient`);
    }

    updateSaturationGradient();
    updateBrightnessGradient();
  }

  function updateSaturationGradient() {
    const saturation = adjustment.saturation;
    const sliders = adjustment.sliders;

    saturation.zero = chroma(adjustment.color.hex).set('hsl.s', 0);
    saturation.full = chroma(adjustment.color.hex).set('hsl.s', 1);

    saturation.scale = chroma.scale([
      saturation.zero,
      adjustment.color.hex,
      saturation.full
    ]);

    sliders.saturation.gradient = getGradientStyle([
      saturation.scale(0),
      saturation.scale(1)
    ]);
  }

  // brightness start & end is always same value
  function updateBrightnessGradient() {
    const brightness = adjustment.brightness;
    const sliders = adjustment.sliders;

    brightness.mid = chroma(adjustment.color.hex).set('hsl.l', 0.5);

    brightness.scale = chroma.scale([
      brightness.start,
      brightness.mid,
      brightness.end
    ]);

    sliders.brightness.gradient = getGradientStyle([
      brightness.scale(0),
      brightness.scale(0.5),
      brightness.scale(1)
    ]);
  }

  function updateSliderPosition() {
    const [hue, saturation, brightness] = adjustment.color.hsl;
    const sliders = adjustment.sliders;

    sliders.hue.value = Math.floor(hue);
    sliders.saturation.value = Math.floor(saturation * 100) / 100;
    sliders.brightness.value = Math.floor(brightness * 100) / 100;

    if (DEBUG) {
      console.log(`update slider position`);
    }
  }

  function updateColorWithSlider(type, value) {
    let hsl = adjustment.color.hsl;

    if (type === 'hue') {
      hsl[0] = value;
    } else if (type === 'saturation') {
      hsl[1] = value;
    } else {
      hsl[2] = value;
    }

    adjustment.color.hex = chroma(hsl, 'hsl').hex();
    adjustment.color.luminance = chroma(hsl, 'hsl').luminance();

    updateSliderPosition();
    updateSliderGradient();
  }

  provide(ADJUSTMENT_CONTEXT, {
    adjustment,
    initialAdjustmentColor,
    openAdjustmentPanel,
    closeAdjustmentPanel,
    updateSliderPosition,
    updateColorWithSlider,
    updateSliderGradient
  });
}

export function useAdjustmentContext() {
  const context = inject(ADJUSTMENT_CONTEXT);

  if (!context) {
    console.log('useAdjustmentProvider must be used with useAdjustmentContext');
  }

  return context;
}
