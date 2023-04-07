const FILE_CHOOSE = document.querySelector('#upload-file');
const PREVIEW_IMAGE = document.querySelector('#preview-image');

const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];

FILE_CHOOSE.addEventListener('change', () => {
  const FILE = FILE_CHOOSE.files[0];
  const FILE_NAME = FILE.name.toLowerCase();

  const MATCHES = FILE_TYPES.some((it) => FILE_NAME.endsWith(it));

  if (MATCHES) {
    PREVIEW_IMAGE.src = URL.createObjectURL(FILE);
  }
});
