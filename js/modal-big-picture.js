import { isEscapeKey } from './util.js';
import { fillingBigPicture } from './big-picture.js';

const BIG_PICTURE = document.querySelector('.big-picture');
const PICTURE_CONTAINER = document.querySelector('.pictures');
const CLOSE = document.querySelector('.big-picture__cancel');

const openModal = () => {
  BIG_PICTURE.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = () => {
  BIG_PICTURE.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
};

const bigPictureClick = (userPictures) => {
  PICTURE_CONTAINER.addEventListener('click', (evt) => {
    if (evt.target.classList[0] === 'picture__img') {
      evt.preventDefault();

      fillingBigPicture(evt.target, userPictures);
      openModal();
    }
  });
};

CLOSE.addEventListener('click', () => {
  closeModal();
});

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export { bigPictureClick };
