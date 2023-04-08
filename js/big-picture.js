const commentContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment').cloneNode(true);
const commentFragment = document.createDocumentFragment();
const commentCount = document.querySelector('.social__comment-count');
const loadMoreButton = document.querySelector('.comments-loader');

const CURRENT_COMMENTS = [];
let commentsLength;
let commentsShow;

const fillingUserComments = () => {
  for (let i = 0; i < 5; i++) {
    if (CURRENT_COMMENTS.length > 0) {
      const userComment = commentTemplate.cloneNode(true);

      userComment.querySelector('.social__picture').src = CURRENT_COMMENTS[0].avatar;
      userComment.querySelector('.social__picture').alt = CURRENT_COMMENTS[0].name;
      userComment.querySelector('.social__text').textContent = CURRENT_COMMENTS[0].message;

      commentsShow++;

      commentCount.textContent = `${commentsShow} из ${commentsLength} комментариев`;

      commentFragment.append(userComment);
      commentContainer.append(commentFragment);
      CURRENT_COMMENTS.shift();
    }

    if (CURRENT_COMMENTS.length === 0) {
      loadMoreButton.removeEventListener('click', fillingUserComments);
      loadMoreButton.classList.add('hidden');
      return;
    }
  }
};

const fillingBigPicture = (currentPicture, userPictures) => {
  const bigPicture = document.querySelector('#big-picture__img');
  const likeCount = document.querySelector('.likes-count');
  const caption = document.querySelector('.social__caption');

  userPictures.forEach((userPicture) => {
    if (userPicture.id === +currentPicture.id) {
      bigPicture.src = userPicture.url;
      likeCount.textContent = userPicture.likes;
      caption.textContent = userPicture.description;

      if (userPicture.comments.length > 0) {
        Object.assign(CURRENT_COMMENTS, userPicture.comments);
        commentContainer.innerHTML = '';
        loadMoreButton.addEventListener('click', fillingUserComments);
        loadMoreButton.classList.remove('hidden');
        commentsLength = userPicture.comments.length;
        commentsShow = 0;

        return fillingUserComments(CURRENT_COMMENTS);
      }

      commentCount.textContent = 'Здесь пока нет комментариев, будьте первым!';
      commentContainer.innerHTML = '';
      loadMoreButton.classList.add('hidden');
    }
  });
};

export { fillingBigPicture };
