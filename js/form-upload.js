import { closeModal } from './modal-form-upload.js';
import { isEscapeKey } from './util.js';

const SCALE_CONTROL_VALUE = document.querySelector('.scale__control--value');
const PREVIEW_IMAGE = document.querySelector('.img-upload__preview').querySelector('img');
const FORM = document.querySelector('.img-upload__form');
const EFFECT_SLIDER = document.querySelector('.effect-level__slider');
const EFFECT_LEVEL = document.querySelector('.effect-level__value');
let currentFilter = '';

const scaleControl = (evt) => {
  const currentValue = parseInt(SCALE_CONTROL_VALUE.value, 10);
  let scale = currentValue / 100;
  const modifier = evt.target.classList[1];

  if (modifier.includes('--smaller')) {

    if (currentValue > 25) {
      SCALE_CONTROL_VALUE.setAttribute('value', `${currentValue - 25}%`);
      scale -= 0.25;
      PREVIEW_IMAGE.style.transform = `scale(${scale})`;
    }
  } else if (modifier.includes('--bigger')) {

    if (currentValue < 100) {
      SCALE_CONTROL_VALUE.setAttribute('value', `${currentValue + 25}%`);
      scale += 0.25;
      PREVIEW_IMAGE.style.transform = `scale(${scale})`;
    }
  }
};

noUiSlider.create(EFFECT_SLIDER, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower'
});

const chooseFilter = (evt) => {
  if (evt.target.classList[0] === 'effects__radio') {
    const CURRENT_FILTER = evt.target.value;

    if (evt.target.id === 'effect-none') {
      EFFECT_SLIDER.setAttribute('disabled', true);
      EFFECT_SLIDER.classList.add('hidden');
      PREVIEW_IMAGE.style.filter = null;
    } else if (evt.target.id === 'effect-chrome') {
      EFFECT_SLIDER.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1
      });
      EFFECT_SLIDER.removeAttribute('disabled');
      EFFECT_SLIDER.classList.remove('hidden');
      currentFilter = 'grayscale';
      EFFECT_SLIDER.noUiSlider.set(1);
    } else if (evt.target.id === 'effect-sepia') {
      EFFECT_SLIDER.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1
      });
      EFFECT_SLIDER.removeAttribute('disabled');
      EFFECT_SLIDER.classList.remove('hidden');
      currentFilter = 'sepia';
      EFFECT_SLIDER.noUiSlider.set(1);
    } else if (evt.target.id === 'effect-marvin') {
      EFFECT_SLIDER.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1
      });
      EFFECT_SLIDER.removeAttribute('disabled');
      EFFECT_SLIDER.classList.remove('hidden');
      currentFilter = 'invert';
      EFFECT_SLIDER.noUiSlider.set(100);
    } else if (evt.target.id === 'effect-phobos') {
      EFFECT_SLIDER.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1
      });
      EFFECT_SLIDER.removeAttribute('disabled');
      EFFECT_SLIDER.classList.remove('hidden');
      currentFilter = 'blur';
      EFFECT_SLIDER.noUiSlider.set(3);
    } else if (evt.target.id === 'effect-heat') {
      EFFECT_SLIDER.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1
      });
      EFFECT_SLIDER.removeAttribute('disabled');
      EFFECT_SLIDER.classList.remove('hidden');
      currentFilter = 'brightness';
      EFFECT_SLIDER.noUiSlider.set(3);
    }

    PREVIEW_IMAGE.className = '';
    PREVIEW_IMAGE.classList.add(`effects__preview--${CURRENT_FILTER}`);
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

const getTagsErrorMessage = (value) => {
  const TAGS = value.split(' ');
  const UNIQUE_TAGS = TAGS.map((tag) => tag.toLowerCase());

  if (TAGS.length > 5) {
    return 'Не больше 5 тегов';
  }

  if (new Set(UNIQUE_TAGS).size !== UNIQUE_TAGS.length) {
    return 'Теги должны быть уникальны';
  }

  for (const tag of TAGS) {
    const ERROR = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(tag);
    if (!ERROR) {
      return 'Тег начинается с решетки и имеет максимальную длинну 20 символов (включая решетку), строка после решётки должна состоять из букв и чисел, теги указываются через пробел';
    }
  }
};

const tagsCheck = (value) => {
  if (value !== undefined && value !== '') {
    const TAGS = value.split(' ');
    const UNIQUE_TAGS = TAGS.map((tag) => tag.toLowerCase());

    if (TAGS.length > 5) {
      getTagsErrorMessage('Не больше 5 тегов');
      return false;
    }

    if (new Set(UNIQUE_TAGS).size !== UNIQUE_TAGS.length) {
      return false;
    }

    for (const tag of TAGS) {
      const ERROR = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(tag);
      if (!ERROR) {
        return false;
      }
    }
  }

  return true;
};

const removeMessageSection = () => {
  document.removeEventListener('click', removeMessageSection);
  document.removeEventListener('keydown', onModalEscKeydown);

  if (document.querySelector('.error')) {
    return document.querySelector('.error').remove();
  }

  document.querySelector('.success').remove();
};

const createMessageSection = (isValid) => {
  const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  if (!isValid) {
    document.body.append(ERROR_TEMPLATE);
    const ERROR_BUTTON = document.querySelector('.error__button');
    ERROR_BUTTON.addEventListener('click', removeMessageSection);
    document.addEventListener('click', removeMessageSection);
    document.addEventListener('keydown', onModalEscKeydown);
    return;
  }

  document.body.append(SUCCESS_TEMPLATE);
  const SUCCESS_BUTTON = document.querySelector('.success__button');
  SUCCESS_BUTTON.addEventListener('click', removeMessageSection);
  document.addEventListener('click', removeMessageSection);
  document.addEventListener('keydown', onModalEscKeydown);
};

const PRISTINE = new Pristine(FORM, {
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__error'
});

PRISTINE.addValidator(FORM.querySelector('.text__hashtags'), tagsCheck, getTagsErrorMessage);

const validation = (evt) => {
  evt.preventDefault();

  const IS_VALID = PRISTINE.validate();

  closeModal();
  createMessageSection(IS_VALID);
};

const resetForm = () => {
  PREVIEW_IMAGE.classList.add('effects__preview--none');
  EFFECT_SLIDER.setAttribute('disabled', true);
  EFFECT_SLIDER.classList.add('hidden');
  SCALE_CONTROL_VALUE.setAttribute('value', '100%');
  PREVIEW_IMAGE.style.transform = 'scale(1)';
  PREVIEW_IMAGE.className = '';
  PREVIEW_IMAGE.style = null;
  document.querySelector('#effect-none').checked = true;
  FORM.querySelector('.text__hashtags').value = '';
  FORM.querySelector('.text__description').value = '';
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    return removeMessageSection();
  }
}

export { scaleControl, chooseFilter, validation, resetForm };
