import { isEscapeKey } from './util.js';
import { fillingBigPicture } from './big-picture.js';

const bigPictureSection = document.querySelector('.big-picture');
const pictureContainer = document.querySelector('.pictures');
const closeModalButton = document.querySelector('.big-picture__cancel');

const openModal = () => {
  bigPictureSection.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
};

const closeModal = () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onModalEscKeydown);
};

const bigPictureClick = (userPictures) => {
  pictureContainer.addEventListener('click', (evt) => {
    if (evt.target.classList[0] === 'picture__img') {
      evt.preventDefault();

      fillingBigPicture(evt.target, userPictures);
      openModal();
    }
  });
};

closeModalButton.addEventListener('click', () => {
  closeModal();
});

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

export { bigPictureClick };
