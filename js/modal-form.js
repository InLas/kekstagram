import { isEscapeKey } from './util.js';
import { resetForm } from './reset-form.js';
import { chooseFilter } from './upload-photo-filters.js';

const openFormButton = document.querySelector('.img-upload__control');
const formModal = document.querySelector('.img-upload__overlay');
const closeFormButton = formModal.querySelector('.img-upload__cancel');
const effectFilters = formModal.querySelector('.effects__list');

const openModal = () => {
  formModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  resetForm();

  document.addEventListener('keydown', onModalEscKeydown);
  effectFilters.addEventListener('click', chooseFilter);
};

const closeModal = () => {
  formModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();

  document.removeEventListener('keydown', onModalEscKeydown);
  effectFilters.removeEventListener('click', chooseFilter);
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

openFormButton.addEventListener('click', () => {
  openModal();
});

closeFormButton.addEventListener('click', () => {
  closeModal();
});

export { closeModal };
