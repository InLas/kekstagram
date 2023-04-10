const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('#preview-image');

const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const onSmallerScaleClick = () => {
  const CURRENT_VALUE = parseInt(scaleValue.value, 10);
  let scale = CURRENT_VALUE / 100;

  if (CURRENT_VALUE > MIN_SCALE) {
    scaleValue.value = `${CURRENT_VALUE - STEP_SCALE}%`;
    scale -= STEP_SCALE / 100;
    previewImage.style.transform = `scale(${scale})`;
  }
};

const onBiggerScaleClick = () => {
  const CURRENT_VALUE = parseInt(scaleValue.value, 10);
  let scale = CURRENT_VALUE / 100;

  if (CURRENT_VALUE < MAX_SCALE) {
    scaleValue.value = `${CURRENT_VALUE + STEP_SCALE}%`;
    scale += STEP_SCALE / 100;
    previewImage.style.transform = `scale(${scale})`;
  }
};

smallerScaleButton.addEventListener('click', onSmallerScaleClick);
biggerScaleButton.addEventListener('click', onBiggerScaleClick);
