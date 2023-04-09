import { alertMessage, blockSubmitButton, unblockSubmitButton } from './util.js';
import { sentData } from './api.js';

const form = document.querySelector('.img-upload__form');

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

const PRISTINE = new Pristine(form, {
  classTo: 'text',
  errorTextParent: 'text',
  errorTextClass: 'text__error'
});

PRISTINE.addValidator(form.querySelector('.text__hashtags'), tagsCheck, getTagsErrorMessage);

const setFormSubmit = (closeModal, onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
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

export { setFormSubmit };