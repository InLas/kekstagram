const form = document.querySelector('.img-upload__form');
const previewImage = form.querySelector('#preview-image');
const scaleValue = form.querySelector('.scale__control--value');
const effectSlider = form.querySelector('.effect-level__slider');
const effectLevel = form.querySelector('.effect-level__value');

const resetForm = () => {
  form.reset();
  previewImage.src = 'img/upload-default-image.jpg';
  previewImage.removeAttribute('class');
  previewImage.removeAttribute('style');
  previewImage.classList.add('effects__preview--none');
  effectSlider.setAttribute('disabled', true);
  effectSlider.classList.add('hidden');
  effectLevel.value = '';
  scaleValue.value = '100%';
  document.querySelector('#effect-none').checked = true;
};

export { resetForm };
