import { alertMessage, blockSubmitButton, unblockSubmitButton } from './util.js';
import { sentData } from './api.js';

const SCALE_CONTROL_VALUE = document.querySelector('.scale__control--value');
const PREVIEW_IMAGE = document.querySelector('#preview-image');
const FORM = document.querySelector('.img-upload__form');
const EFFECT_SLIDER = document.querySelector('.effect-level__slider');
const EFFECT_LEVEL = document.querySelector('.effect-level__value');

const getTagsErrorMessage = (value) => {
  const TAGS = value.split(' ');
  const UNIQUE_TAGS = TAGS.map((tag) => tag.toLowerCase());

  if (TAGS.length > 5) {
    return 'Не больше 5 тегов';
  }

  if (new Set(UNIQUE_TAGS).size !== UNIQUE_TAGS.length) {
    return 'Теги должны быть уникальны';
  }

  for (const TAG of TAGS) {
    const ERROR = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(TAG);
    if (!ERROR) {
      return 'Тег начинается с решетки и имеет максимальную длинну 20 символов (включая решетку), строка после решётки должна состоять из букв и чисел, теги указываются через пробел';
    }
  }
};

const tagsCheck = (value) => {
  if (value !== '') {
    const TAGS = value.split(' ');
    const UNIQUE_TAGS = TAGS.map((tag) => tag.toLowerCase());

    if (TAGS.length > 5) {
      return false;
    }

    if (new Set(UNIQUE_TAGS).size !== UNIQUE_TAGS.length) {
      return false;
    }

    for (const TAG of TAGS) {
      const ERROR = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/.test(TAG);
      if (!ERROR) {
        return false;
      }
    }
  }

  return true;
};

const PRISTINE = new Pristine(FORM, {
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__error'
});

PRISTINE.addValidator(FORM.querySelector('.text__hashtags'), tagsCheck, getTagsErrorMessage);

const setFormSubmit = (closeModal, onSuccess, onFail) => {
  FORM.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const IS_VALID = PRISTINE.validate();
    if (IS_VALID) {
      blockSubmitButton();
      sentData(
        () => {
          closeModal();
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          alertMessage('Не удалось отправить форму, попробуйте еще раз');
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    } else {
      closeModal();
      onFail();
    }
  });
};

const resetForm = () => {
  FORM.reset();
  PREVIEW_IMAGE.src = 'img/upload-default-image.jpg';
  PREVIEW_IMAGE.removeAttribute('class');
  PREVIEW_IMAGE.removeAttribute('style');
  PREVIEW_IMAGE.classList.add('effects__preview--none');
  EFFECT_SLIDER.setAttribute('disabled', true);
  EFFECT_SLIDER.classList.add('hidden');
  EFFECT_LEVEL.setAttribute('value', '');
  SCALE_CONTROL_VALUE.setAttribute('value', '100%');
  document.querySelector('#effect-none').checked = true;
};

export { setFormSubmit, resetForm };
