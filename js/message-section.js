import { isEscapeKey } from './util.js'

const ERROR_TEMPLATE = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const SUCCESS_TEMPLATE = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const removeMessageSection = () => {
  const ERROR_SECTION = document.querySelector('.error');
  const SUCCESS_SECTION = document.querySelector('.success');

  document.removeEventListener('click', removeMessageSection);
  document.removeEventListener('keydown', onModalEscKeydown);

  if (ERROR_SECTION) {
    return ERROR_SECTION.remove();
  }

  SUCCESS_SECTION.remove();
};

const createSuccessMessageSection = () => {
  document.body.append(SUCCESS_TEMPLATE);
  const SUCCESS_BUTTON = document.querySelector('.success__button');

  SUCCESS_BUTTON.addEventListener('click', removeMessageSection);
  document.addEventListener('click', removeMessageSection);
  document.addEventListener('keydown', onModalEscKeydown);
}

const createFailMessageSection = () => {
  document.body.append(ERROR_TEMPLATE);
  const ERROR_BUTTON = document.querySelector('.error__button');

  ERROR_BUTTON.addEventListener('click', removeMessageSection);
  document.addEventListener('click', removeMessageSection);
  document.addEventListener('keydown', onModalEscKeydown);
};

function onModalEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    return removeMessageSection();
  }
}

export { createSuccessMessageSection, createFailMessageSection };
