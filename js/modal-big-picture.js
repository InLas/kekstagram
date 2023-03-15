import { isEscapeKey } from './util.js';
import { fillingBigPicture } from './big-picture.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const USER_PICTURES = document.querySelector('.pictures');
const CLOSE = document.querySelector('.big-picture__cancel');

const openModal = (picture) => {
  fillingBigPicture(picture);

  BIG_PICTURE.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = () => {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

USER_PICTURES.addEventListener('click', (evt) => {
  if (evt.target.classList[0] === 'picture__img') {
    evt.preventDefault();

    openModal(evt.target);
  }
});

CLOSE.addEventListener('click', () => {
  closeModal();
});
