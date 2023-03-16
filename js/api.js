import { downloadAllertMessage } from './util.js'

const getData = (onSucces) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((userPictures) => {
      onSucces(userPictures);
    })
    .catch(() => {
      downloadAllertMessage('Не удалось загрузить фотографии, попробуйте обновить страницу')
    })
};

const sentData = () => { };

export { getData, sentData };
