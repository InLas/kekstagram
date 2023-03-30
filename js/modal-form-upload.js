import { isEscapeKey } from './util.js';
import { scaleControl, chooseFilter, resetForm } from './form-upload.js';

const MODAL_UPLOAD = document.querySelector('.img-upload__overlay');
const OPEN_BUTTON = document.querySelector('.img-upload__control');
const CLOSE_BUTTON = document.querySelector('.img-upload__cancel');
const SCALE = document.querySelector('.scale');
const EFFECT_FILTERS = document.querySelector('.effects__list');

const openModal = () => {
  MODAL_UPLOAD.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetForm();

  document.addEventListener('keydown', onModalEscKeydown);
  SCALE.addEventListener('click', scaleControl);
  EFFECT_FILTERS.addEventListener('click', chooseFilter);
};

const closeModal = () => {
  MODAL_UPLOAD.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();

  document.removeEventListener('keydown', onModalEscKeydown);
  SCALE.removeEventListener('click', scaleControl);
  EFFECT_FILTERS.removeEventListener('click', chooseFilter);
};

function onModalEscKeydown(evt) {
  const TAGS_AREA = document.querySelector('.text__hashtags');
  const COMMENTS_AREA = document.querySelector('.text__description');

  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if (document.activeElement !== COMMENTS_AREA && document.activeElement !== TAGS_AREA) {
      return closeModal();
    }
  }
}

OPEN_BUTTON.addEventListener('click', () => {
  openModal();
});

CLOSE_BUTTON.addEventListener('click', () => {
  closeModal();
});

export { closeModal };
