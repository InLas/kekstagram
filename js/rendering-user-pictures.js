const renderUserPictures = (userPictures) => {
  const PICTURES_CONTAINER = document.querySelector('.pictures');
  const PICTURES_TEMPLATE = document.querySelector('#picture').content.querySelector('.picture');
  const PICTURES_FRAGMENT = document.createDocumentFragment();


  // PICTURES_CONTAINER.removeChild('.picture');

  // console.log(choise);

  // if (choise === def) {
  userPictures.forEach(({ id, url, likes, comments }) => {
    const POST_USER = PICTURES_TEMPLATE.cloneNode(true);
    POST_USER.querySelector('.picture__img').src = url;
    POST_USER.querySelector('.picture__img').setAttribute('id', id);
    POST_USER.querySelector('.picture__likes').textContent = likes;
    POST_USER.querySelector('.picture__comments').textContent = comments.length;
    PICTURES_FRAGMENT.append(POST_USER);
  });

  PICTURES_CONTAINER.append(PICTURES_FRAGMENT);

  // }
};

export { renderUserPictures };
