import { getRandomArrayElement } from './util.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

const MAX_PICTURES = 10;

const renderUserPictures = (userPictures) => {
  if (pictureContainer.querySelector('.picture')) {
    const pictures = pictureContainer.querySelectorAll('.picture');

    pictures.forEach((picture) => {
      picture.remove();
    });
  }

  userPictures.forEach(({ id, url, likes, comments }) => {
    const userPost = pictureTemplate.cloneNode(true);
    userPost.querySelector('.picture__img').src = url;
    userPost.querySelector('.picture__img').setAttribute('id', id);
    userPost.querySelector('.picture__likes').textContent = likes;
    userPost.querySelector('.picture__comments').textContent = comments.length;
    pictureFragment.append(userPost);
  });

  pictureContainer.append(pictureFragment);
};

const renderRandomPictures = (userPictures) => {
  const USER_PICTURES = userPictures.slice();

  const TOTAL_USER_PICTURES = [];

  while (USER_PICTURES.length > 0 && TOTAL_USER_PICTURES.length < MAX_PICTURES) {
    const CURRENT_PICTURE = getRandomArrayElement(USER_PICTURES);

    if (!TOTAL_USER_PICTURES.includes(CURRENT_PICTURE)) {
      TOTAL_USER_PICTURES.push(CURRENT_PICTURE);
      USER_PICTURES.splice(USER_PICTURES.indexOf(CURRENT_PICTURE), 1);
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
