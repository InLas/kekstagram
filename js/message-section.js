import { isEscapeKey } from './util.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const removeMessageSection = () => {
  const errorSection = document.querySelector('.error');
  const successSection = document.querySelector('.success');

  document.removeEventListener('click', removeMessageSection);
  document.removeEventListener('keydown', onModalEscKeydown);

  if (errorSection) {
    return errorSection.remove();
  }

  successSection.remove();
};

const createSuccessMessageSection = () => {
  document.body.append(successTemplate);
  const successButton = document.querySelector('.success__button');

  successButton.addEventListener('click', removeMessageSection);
  document.addEventListener('click', removeMessageSection);
  document.addEventListener('keydown', onModalEscKeydown);
};

const createFailMessageSection = () => {
  document.body.append(errorTemplate);
  const errorButton = document.querySelector('.error__button');

  errorButton.addEventListener('click', removeMessageSection);
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
