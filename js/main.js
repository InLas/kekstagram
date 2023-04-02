import { renderUserPictures } from './rendering-user-pictures.js';
import { bigPictureClick } from './modal-big-picture.js';
import './modal-form-upload.js';
import { getData } from './api.js';
import { closeModal } from './modal-form-upload.js';
import { setFormSubmit } from './form-upload.js';
import { filterUserPictures } from './filters.js';
import './user-photo.js';

getData((userPictures) => {
  // renderUserPictures(userPictures);
  bigPictureClick(userPictures);
  filterUserPictures(renderUserPictures(userPictures));
});

setFormSubmit(closeModal);

const FILTER_PICTURES = document.querySelector('.img-filters');
FILTER_PICTURES.classList.remove('img-filters--inactive');
