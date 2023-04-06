import { allertMessage } from './util.js';

const FILTER_PICTURES = document.querySelector('.img-filters');

const getData = (onSucces) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((userPictures) => {
      onSucces(userPictures);
      FILTER_PICTURES.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      allertMessage('Не удалось загрузить фотографии, попробуйте обновить страницу');
    });
};

const sentData = (onSucces, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sentData };
