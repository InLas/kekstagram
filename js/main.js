import { renderUserPictures, renderRandomPictures, renderDiscussedPictures } from './rendering-users-pictures.js';
import { filterUsersPictures } from './users-pictures-filter.js';
import { debounce } from './util.js';
import { bigPictureClick } from './modal-big-picture.js';
import { getData } from './api.js';
import { closeModal } from './modal-form.js';
import { createSuccessMessageSection, createFailMessageSection } from './message-section.js'
import { setFormSubmit } from './upload-form.js';
import './upload-photo.js';

const RERENDER_DELAY = 500;

getData((userPictures) => {
  renderUserPictures(userPictures);
  bigPictureClick(userPictures);
  filterUsersPictures(
    debounce(() => renderUserPictures(userPictures), RERENDER_DELAY),
    debounce(() => renderRandomPictures(userPictures), RERENDER_DELAY),
    debounce(() => renderDiscussedPictures(userPictures), RERENDER_DELAY)
  );
});

setFormSubmit(closeModal, createSuccessMessageSection, createFailMessageSection);
