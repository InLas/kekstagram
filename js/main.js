import { renderUserPictures } from './rendering-user-pictures.js';
import './modal-big-picture.js';
import './modal-form-upload.js';
import './form-upload.js';
import { getData } from './api.js';

getData((userPictures) => {
  renderUserPictures(userPictures);
});


