import { renderUserPictures } from './rendering-user-pictures.js';
import './modal-big-picture.js';
import './modal-form-upload.js';
import { getData } from './api.js';
import { closeModal } from './modal-form-upload.js';
import { setFormSubmit } from './form-upload.js';

getData((userPictures) => {
  renderUserPictures(userPictures);
});

setFormSubmit(closeModal);
