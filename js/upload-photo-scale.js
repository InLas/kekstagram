const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('#preview-image');

const MIN_SCALE = 25;
const MAX_SCALE = 100;

const scaleDecrease = () => {
  const CURRENT_VALUE = parseInt(scaleValue.value, 10);
  let scale = CURRENT_VALUE / 100;

  if (CURRENT_VALUE > MIN_SCALE) {
    scaleValue.value = `${CURRENT_VALUE - 25}%`;
    scale -= 0.25;
    previewImage.style.transform = `scale(${scale})`;
  }
};

const scaleIncrease = () => {
  const CURRENT_VALUE = parseInt(scaleValue.value, 10);
  let scale = CURRENT_VALUE / 100;

  if (CURRENT_VALUE < MAX_SCALE) {
    scaleValue.value = `${CURRENT_VALUE + 25}%`;
    scale += 0.25;
    previewImage.style.transform = `scale(${scale})`;
  }
};

scaleSmaller.addEventListener('click', scaleDecrease);
scaleBigger.addEventListener('click', scaleIncrease);
