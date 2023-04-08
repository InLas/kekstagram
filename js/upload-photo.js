const chooseFileButton = document.querySelector('#upload-file');
const previewImage = document.querySelector('#preview-image');

const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

chooseFileButton.addEventListener('change', () => {
  const FILE = chooseFileButton.files[0];
  const FILE_NAME = FILE.name.toLowerCase();

  const MATCHES = FILE_TYPES.some((it) => FILE_NAME.endsWith(it));

  if (MATCHES) {
    previewImage.src = URL.createObjectURL(FILE);
  }
});
