const FILTER_PICTURE = document.querySelector('.img-filters');
const FILTER_BUTTONS = document.querySelectorAll('.img-filters__button');

const filterUsersPictures = (def, random, discussed) => {
  FILTER_PICTURE.addEventListener('click', (evt) => {
    if (evt.target.classList[0] === 'img-filters__button') {
      FILTER_BUTTONS.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });
    }

    if (evt.target.id === 'filter-default') {
      evt.target.classList.add('img-filters__button--active');
      return def();
    }

    if (evt.target.id === 'filter-random') {
      evt.target.classList.add('img-filters__button--active');
      return random();
    }

    if (evt.target.id === 'filter-discussed') {
      evt.target.classList.add('img-filters__button--active');
      return discussed();
    }
  });
};

export { filterUsersPictures };
