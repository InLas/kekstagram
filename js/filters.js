const FILTER_PICTURES = document.querySelector('.img-filters');
const FILTER_BUTTONS = document.querySelectorAll('.img-filters__button');

const filterUserPictures = (def, random, discussed) => {
  FILTER_PICTURES.addEventListener('click', (evt) => {
    if (evt.target.id === 'filter-default') {
      FILTER_BUTTONS.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });

      evt.target.classList.add('img-filters__button--active');
      def();
    }
    if (evt.target.id === 'filter-random') {
      FILTER_BUTTONS.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });

      evt.target.classList.add('img-filters__button--active');
      random();
    }
    if (evt.target.id === 'filter-discussed') {
      FILTER_BUTTONS.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });

      evt.target.classList.add('img-filters__button--active');
      discussed();
    }
  });
};

export { filterUserPictures };
