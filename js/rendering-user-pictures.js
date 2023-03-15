import { generateObjects } from './data.js';

const PICTURES_CONTAINER = document.querySelector('.pictures');
const PICTURES_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
const USER_PICTURES = generateObjects(25);
const PICTURES_FRAGMENT = document.createDocumentFragment();

USER_PICTURES.forEach(({ id, url, likes, comments }) => {
  const POST_USER = PICTURES_TEMPLATE.cloneNode(true);
  POST_USER.querySelector('.picture__img').src = url;
  POST_USER.querySelector('.picture__img').setAttribute('id', id);
  POST_USER.querySelector('.picture__likes').textContent = likes;
  POST_USER.querySelector('.picture__comments').textContent = comments.length;
  PICTURES_FRAGMENT.append(POST_USER);
});

PICTURES_CONTAINER.append(PICTURES_FRAGMENT);

export { USER_PICTURES };
