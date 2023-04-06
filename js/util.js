const ALLERT_SHOWTIME = 5000;
const SUBMIT_BUTTON = document.querySelector('.img-upload__submit');

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (pictures) => pictures[Math.floor(Math.random() * pictures.length)];

const allertMessage = (message) => {
  const ALLERT_CONTAINER = document.createElement('div');
  ALLERT_CONTAINER.style.zIndex = 100;
  ALLERT_CONTAINER.style.position = 'absolute';
  ALLERT_CONTAINER.style.top = 0;
  ALLERT_CONTAINER.style.left = 0;
  ALLERT_CONTAINER.style.right = 0;
  ALLERT_CONTAINER.style.padding = '15px 15px';
  ALLERT_CONTAINER.style.textAlign = 'center';
  ALLERT_CONTAINER.style.fontWeight = 'bold';
  ALLERT_CONTAINER.style.backgroundColor = 'red';

  ALLERT_CONTAINER.textContent = message;

  document.body.append(ALLERT_CONTAINER);

  setTimeout(() => {
    ALLERT_CONTAINER.remove();
  }, ALLERT_SHOWTIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const blockSubmitButton = () => {
  SUBMIT_BUTTON.disabled = true;
  SUBMIT_BUTTON.textContent = 'Загрузка...';
};

const unblockSubmitButton = () => {
  SUBMIT_BUTTON.disabled = false;
  SUBMIT_BUTTON.textContent = 'Опубликовать.';
};

export { isEscapeKey, getRandomArrayElement, allertMessage, debounce, blockSubmitButton, unblockSubmitButton };
