import { getRandomArrayElement } from './util.js';

const PICTURE_CONTAINER = document.querySelector('.pictures');
const PICTURE_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const PICTURE_FRAGMENT = document.createDocumentFragment();
const MAX_PICTURES = 10;

const renderUserPictures = (userPictures) => {
  if (PICTURE_CONTAINER.querySelector('.picture')) {
    const PICTURES = PICTURE_CONTAINER.querySelectorAll('.picture');

    PICTURES.forEach((picture) => {
      picture.remove();
    });
  }

  userPictures.forEach(({ id, url, likes, comments }) => {
    const POST_USER = PICTURE_TEMPLATE.cloneNode(true);
    POST_USER.querySelector('.picture__img').src = url;
    POST_USER.querySelector('.picture__img').setAttribute('id', id);
    POST_USER.querySelector('.picture__likes').textContent = likes;
    POST_USER.querySelector('.picture__comments').textContent = comments.length;
    PICTURE_FRAGMENT.append(POST_USER);
  });

  PICTURE_CONTAINER.append(PICTURE_FRAGMENT);
};

const renderRandomPictures = (userPictures) => {
  const USER_PICTURES = userPictures.slice();

  const TOTAL_USER_PICTURES = [];

  while (USER_PICTURES.length > 0 && TOTAL_USER_PICTURES.length < MAX_PICTURES) {
    const CURRENT_VALUE = getRandomArrayElement(USER_PICTURES);

    if (!TOTAL_USER_PICTURES.includes(CURRENT_VALUE)) {
      TOTAL_USER_PICTURES.push(CURRENT_VALUE);
      USER_PICTURES.splice(USER_PICTURES.indexOf(CURRENT_VALUE), 1);
    }
  }

  return renderUserPictures(TOTAL_USER_PICTURES);
};

const sortToComments = (commentA, commentB) => {
  const COMMENT_A = commentA.comments.length;
  const COMMENT_B = commentB.comments.length;

  return COMMENT_B - COMMENT_A;
};

const renderDiscussedPictures = (userPictures) => renderUserPictures(userPictures.slice().sort(sortToComments));

export { renderUserPictures, renderRandomPictures, renderDiscussedPictures };
