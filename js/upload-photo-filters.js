const PREVIEW_IMAGE = document.querySelector('.img-upload__preview').querySelector('img');
const EFFECT_SLIDER = document.querySelector('.effect-level__slider');
const EFFECT_LEVEL = document.querySelector('.effect-level__value');

const Filters = [
  {
    NAME: 'effect-chrome',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    CURRENT_FILTER: 'grayscale'
  },
  {
    NAME: 'effect-sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    CURRENT_FILTER: 'sepia'
  },
  {
    NAME: 'effect-marvin',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    CURRENT_FILTER: 'invert'
  },
  {
    NAME: 'effect-phobos',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    CURRENT_FILTER: 'blur'
  },
  {
    NAME: 'effect-heat',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    CURRENT_FILTER: 'brightness'
  },
];
let currentFilter = '';

noUiSlider.create(EFFECT_SLIDER, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  step: 1,
  connect: 'lower'
});

const chooseFilter = (evt) => {
  if (evt.target.classList[0] === 'effects__radio') {
    if (evt.target.id === 'effect-none') {
      EFFECT_SLIDER.setAttribute('disabled', true);
      EFFECT_SLIDER.classList.add('hidden');
      EFFECT_LEVEL.removeAttribute('value');
      PREVIEW_IMAGE.style.filter = null;
      return;
    }

    Filters.find((effect => {
      if (effect.NAME === evt.target.id) {
        EFFECT_SLIDER.noUiSlider.updateOptions({
          range: {
            min: effect.MIN,
            max: effect.MAX
          },
          step: effect.STEP
        });
        EFFECT_SLIDER.removeAttribute('disabled');
        EFFECT_SLIDER.classList.remove('hidden');
        EFFECT_SLIDER.noUiSlider.set(effect.MAX);
        currentFilter = effect.CURRENT_FILTER;
        PREVIEW_IMAGE.classList = '';
        PREVIEW_IMAGE.classList.add(`effects__preview--${effect.CURRENT_FILTER}`);
      }
    }));
  }
};

EFFECT_SLIDER.noUiSlider.on('update', () => {
  const FILTER_VALUE = EFFECT_SLIDER.noUiSlider.get();

  EFFECT_LEVEL.setAttribute('value', FILTER_VALUE);

  if (currentFilter === 'invert') {
    PREVIEW_IMAGE.style.filter = ` ${currentFilter}(${FILTER_VALUE}%)`;
    return;
  }

  if (currentFilter === 'blur') {
    PREVIEW_IMAGE.style.filter = ` ${currentFilter}(${FILTER_VALUE}px)`;
    return;
  }

  PREVIEW_IMAGE.style.filter = ` ${currentFilter}(${FILTER_VALUE})`;
});

export { chooseFilter };
