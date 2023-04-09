const previewImage = document.querySelector('#preview-image');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');

const FILTER = [
  {
    NAME: 'effect-chrome',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    MODIFIER: '',
    CURRENT_FILTER: 'grayscale'
  },
  {
    NAME: 'effect-sepia',
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    MODIFIER: '',
    CURRENT_FILTER: 'sepia'
  },
  {
    NAME: 'effect-marvin',
    MIN: 0,
    MAX: 100,
    STEP: 1,
    MODIFIER: '%',
    CURRENT_FILTER: 'invert'
  },
  {
    NAME: 'effect-phobos',
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    MODIFIER: 'px',
    CURRENT_FILTER: 'blur'
  },
  {
    NAME: 'effect-heat',
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    MODIFIER: '',
    CURRENT_FILTER: 'brightness'
  },
];
let currentFilter = '';

noUiSlider.create(effectSlider, {
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
      effectSlider.setAttribute('disabled', true);
      effectSlider.classList.add('hidden');
      effectLevel.value = '';
      previewImage.removeAttribute('style');
      previewImage.removeAttribute('class');
      return;
    }

    FILTER.find(((effect) => {
      if (effect.NAME === evt.target.id) {
        effectSlider.noUiSlider.updateOptions({
          range: {
            min: effect.MIN,
            max: effect.MAX
          },
          step: effect.STEP,
          format: {
            to: (value) => {
              if (Number.isInteger(value)) {
                return value.toFixed(0) + effect.MODIFIER;
              }

              return value.toFixed(1) + effect.MODIFIER;
            },
            from: (value) => parseFloat(value)
          }
        });

        currentFilter = effect.CURRENT_FILTER;
        previewImage.removeAttribute('class');
        previewImage.classList.add(`effects__preview--${evt.target.value}`);
        effectSlider.removeAttribute('disabled');
        effectSlider.classList.remove('hidden');
        effectSlider.noUiSlider.set(effect.MAX);
      }
    }));
  }
};

effectSlider.noUiSlider.on('update', () => {
  const FILTER_VALUE = effectSlider.noUiSlider.get();

  effectLevel.value = parseFloat(FILTER_VALUE);
  previewImage.style.filter = ` ${currentFilter}(${FILTER_VALUE})`;
});

export { chooseFilter };
