const ALERT_SHOWTIME = 5000;
const SUBMIT_BUTTON = document.querySelector('.img-upload__submit');

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (pictures) => pictures[Math.floor(Math.random() * pictures.length)];

const alertMessage = (message) => {
  const ALERT_CONTAINER = document.createElement('div');
  ALERT_CONTAINER.style.zIndex = 100;
  ALERT_CONTAINER.style.position = 'absolute';
  ALERT_CONTAINER.style.top = 0;
  ALERT_CONTAINER.style.left = 0;
  ALERT_CONTAINER.style.right = 0;
  ALERT_CONTAINER.style.padding = '15px 15px';
  ALERT_CONTAINER.style.textAlign = 'center';
  ALERT_CONTAINER.style.fontWeight = 'bold';
  ALERT_CONTAINER.style.backgroundColor = 'red';

  ALERT_CONTAINER.textContent = message;

  document.body.append(ALERT_CONTAINER);

  setTimeout(() => {
    ALERT_CONTAINER.remove();
  }, ALERT_SHOWTIME);
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

export { isEscapeKey, getRandomArrayElement, alertMessage, debounce, blockSubmitButton, unblockSubmitButton };
