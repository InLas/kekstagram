import { alertMessage, blockSubmitButton, unblockSubmitButton } from './util.js';
import { sentData } from './api.js';

const form = document.querySelector('.img-upload__form');

const MAX_TAGS_LENGTH = 5;
const TAG_VALIDATION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const Errors = {
  LENGTH_ERROR: 'Не больше 5 тегов',
  UNIQUE_ERROR: 'Теги должны быть уникальны',
  VALIDATE_ERROR: 'Тег начинается с решетки и имеет максимальную длинну 20 символов (включая решетку), строка после решётки должна состоять из букв и чисел, теги указываются через пробел'
};

const checkTagsLength = (value) => {
  if (value !== '') {
    const TAGS = value.split(' ');

    if (TAGS.length > MAX_TAGS_LENGTH) {
      return false;
    }
  }

  return true;
};

const checkTagsUnique = (value) => {
  if (value.length > 1) {
    const TAGS = value.split(' ');
    const UNIQUE_TAGS = TAGS.map((tag) => tag.toLowerCase());

    if (new Set(UNIQUE_TAGS).size !== UNIQUE_TAGS.length) {
      return false;
    }
  }

  return true;
};

const checkTagsValidation = (value) => {
  if (value !== '') {
    const TAGS = value.split(' ');

    for (const TAG of TAGS) {
      if (!TAG_VALIDATION.test(TAG)) {
        return false;
      }
    }
  }

  return true;
};

const tagsCheck = (value) => checkTagsLength(value) && checkTagsUnique(value) && checkTagsValidation(value);

const getTagsErrorMessage = (value) => {
  if (!checkTagsLength(value)) {
    return Errors.LENGTH_ERROR;
  }

  if (!checkTagsUnique(value)) {
    return Errors.UNIQUE_ERROR;
  }

  if (!checkTagsValidation(value)) {
    return Errors.VALIDATE_ERROR;
  }
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
