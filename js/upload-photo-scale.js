const SCALE_CONTROL_VALUE = document.querySelector('.scale__control--value');
const PREVIEW_IMAGE = document.querySelector('.img-upload__preview').querySelector('img');

const scaleControl = (evt) => {
  const MODIFIER = evt.target.classList[1];
  const CURRENT_VALUE = parseInt(SCALE_CONTROL_VALUE.value, 10);
  let scale = CURRENT_VALUE / 100;

  if (MODIFIER.includes('--smaller')) {

    if (CURRENT_VALUE > 25) {
      SCALE_CONTROL_VALUE.setAttribute('value', `${CURRENT_VALUE - 25}%`);
      scale -= 0.25;
      PREVIEW_IMAGE.style.transform = `scale(${scale})`;
    }
  } else if (MODIFIER.includes('--bigger')) {

    if (CURRENT_VALUE < 100) {
      SCALE_CONTROL_VALUE.setAttribute('value', `${CURRENT_VALUE + 25}%`);
      scale += 0.25;
      PREVIEW_IMAGE.style.transform = `scale(${scale})`;
    }
  }
};

export { scaleControl };
