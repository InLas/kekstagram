const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('#preview-image');

const scaleControl = (evt) => {
  const MODIFIER = evt.target.classList[1];
  const CURRENT_VALUE = parseInt(scaleValue.value, 10);
  let scale = CURRENT_VALUE / 100;

  if (MODIFIER.includes('--smaller')) {

    if (CURRENT_VALUE > 25) {
      scaleValue.value = `${CURRENT_VALUE - 25}%`;
      scale -= 0.25;
      previewImage.style.transform = `scale(${scale})`;
    }
  }

  if (MODIFIER.includes('--bigger')) {

    if (CURRENT_VALUE < 100) {
      scaleValue.value = `${CURRENT_VALUE + 25}%`;
      scale += 0.25;
      previewImage.style.transform = `scale(${scale})`;
    }
  }
};

export { scaleControl };
