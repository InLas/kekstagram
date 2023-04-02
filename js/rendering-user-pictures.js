import { getRandomArrayElement } from './util.js';

const renderUserPictures = (userPictures) => {
  const PICTURES_CONTAINER = document.querySelector('.pictures');
  const PICTURES_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
  const PICTURES_FRAGMENT = document.createDocumentFragment();

  if (PICTURES_CONTAINER.querySelector('.picture')) {
    const PICTURES = PICTURES_CONTAINER.querySelectorAll('.picture');

    PICTURES.forEach((picture) => {
      picture.remove();
    });
  }

  userPictures.forEach(({ id, url, likes, comments }) => {
    const POST_USER = PICTURES_TEMPLATE.cloneNode(true);
    POST_USER.querySelector('.picture__img').src = url;
    POST_USER.querySelector('.picture__img').setAttribute('id', id);
    POST_USER.querySelector('.picture__likes').textContent = likes;
    POST_USER.querySelector('.picture__comments').textContent = comments.length;
    PICTURES_FRAGMENT.append(POST_USER);
  });

  PICTURES_CONTAINER.append(PICTURES_FRAGMENT);
};

const renderRandomPictures = (userPictures) => {
  const USER_PICTURES = userPictures.slice();
  const MAX_PICTURES = 10;

  const TOTAL_USER_PICTURES = [];

  while (TOTAL_USER_PICTURES.length < MAX_PICTURES) {
    const CURRENT_VALUE = getRandomArrayElement(USER_PICTURES);

    if (!TOTAL_USER_PICTURES.includes(CURRENT_VALUE)) {
      TOTAL_USER_PICTURES.push(CURRENT_VALUE);
    }

  }

  return renderUserPictures(TOTAL_USER_PICTURES);
};

const sortToComments = (commentsA, commentsB) => {
  const COMMENTS_A = commentsA.comments.length;
  const COMMENTS_B = commentsB.comments.length;

  return COMMENTS_B - COMMENTS_A;
};

const renderDiscussedPictures = (userPictures) => renderUserPictures(userPictures.slice().sort(sortToComments));

export { renderUserPictures, renderRandomPictures, renderDiscussedPictures };
