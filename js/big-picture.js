import { USER_PICTURES } from './rendering-user-pictures.js';

const SECTION = document.querySelector('.big-picture');
const LOAD_MORE_BUTTON = SECTION.querySelector('.comments-loader');
const COMMENTS = SECTION.querySelector('.social__comments');
const COMMENTS_COUNTER = SECTION.querySelector('.social__comment-count');
const COMMENT_TEMPLATE = COMMENTS.querySelector('.social__comment').cloneNode(true);
const COMMENTS_FRAGMENT = document.createDocumentFragment();
const CURRENT_COMMENTS = [];
let commentsLength;
let commentsShow;

const fillingUserComments = () => {
  for (let i = 0; i < 5; i++) {
    if (CURRENT_COMMENTS.length > 0) {
      const USER_COMMENT = COMMENT_TEMPLATE.cloneNode(true);

      USER_COMMENT.querySelector('.social__picture').src = CURRENT_COMMENTS[0].avatar;
      USER_COMMENT.querySelector('.social__picture').alt = CURRENT_COMMENTS[0].name;
      USER_COMMENT.querySelector('.social__text').textContent = CURRENT_COMMENTS[0].message;

      commentsShow++;

      COMMENTS_COUNTER.textContent = `${commentsShow} из ${commentsLength} комментариев`;

      COMMENTS_FRAGMENT.append(USER_COMMENT);
      COMMENTS.append(COMMENTS_FRAGMENT);
      CURRENT_COMMENTS.shift();
    }

    if (CURRENT_COMMENTS.length === 0) {
      LOAD_MORE_BUTTON.removeEventListener('click', fillingUserComments);
      LOAD_MORE_BUTTON.classList.add('hidden');
      return;
    }
  }
};

const fillingBigPicture = (CurrentPicture) => {
  USER_PICTURES.forEach((userPicture) => {
    if (userPicture.id === +CurrentPicture.id) {
      SECTION.querySelector('.big-picture__img').querySelector('img').src = userPicture.url;
      SECTION.querySelector('.likes-count').textContent = userPicture.likes;
      SECTION.querySelector('.social__caption').textContent = userPicture.description;

      if (userPicture.comments.length > 0) {
        Object.assign(CURRENT_COMMENTS, userPicture.comments);
        COMMENTS.innerHTML = '';
        LOAD_MORE_BUTTON.addEventListener('click', fillingUserComments);
        LOAD_MORE_BUTTON.classList.remove('hidden');
        commentsLength = userPicture.comments.length;
        commentsShow = 0;

        return fillingUserComments(CURRENT_COMMENTS);
      }

      COMMENTS_COUNTER.textContent = 'Здесь пока нет комментариев, будьте первым!';
      COMMENTS.innerHTML = '';
      LOAD_MORE_BUTTON.classList.add('hidden');
    }
  });
};

export { fillingBigPicture };
