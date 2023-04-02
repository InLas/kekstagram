import { renderUserPictures, renderRandomPictures, renderDiscussedPictures } from './rendering-user-pictures.js';
import { bigPictureClick } from './modal-big-picture.js';
import './modal-form-upload.js';
import { getData } from './api.js';
import { closeModal } from './modal-form-upload.js';
import { setFormSubmit } from './form-upload.js';
import { filterUserPictures } from './filters.js';
import './user-photo.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

getData((userPictures) => {
  renderUserPictures(userPictures);
  bigPictureClick(userPictures);
  filterUserPictures(
    debounce(() => renderUserPictures(userPictures), RERENDER_DELAY),
    debounce(() => renderRandomPictures(userPictures), RERENDER_DELAY),
    debounce(() => renderDiscussedPictures(userPictures), RERENDER_DELAY)
  );
});

setFormSubmit(closeModal);
