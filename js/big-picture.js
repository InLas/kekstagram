const LOAD_MORE_BUTTON = document.querySelector('.comments-loader');
const COMMENTS = document.querySelector('.social__comments');
const COMMENTS_COUNTER = document.querySelector('.social__comment-count');
const COMMENT_TEMPLATE = document.querySelector('.social__comment').cloneNode(true);
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

const fillingBigPicture = (currentPicture, userPictures) => {
  const PICTURE = document.querySelector('.big-picture__img').querySelector('img');
  const LIKES_COUNT = document.querySelector('.likes-count');
  const CAPTION = document.querySelector('.social__caption');

  userPictures.forEach((userPicture) => {
    if (userPicture.id === +currentPicture.id) {
      PICTURE.src = userPicture.url;
      LIKES_COUNT.textContent = userPicture.likes;
      CAPTION.textContent = userPicture.description;

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
