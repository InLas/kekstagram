import { getInteger, getRandomElement, getRandomIntFromRangeGenerator } from './util.js';

const NAMES = ['Глеб', 'Алеша', 'Армен', 'Ашотик', 'Елисей', 'Никита'];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

let photo = 0;

const getMessage = (min, max) => {
  const RESULT = getInteger(min, max);

  if (RESULT === 1) {
    return getRandomElement(MESSAGES);
  }

  return `${getRandomElement(MESSAGES)} ${getRandomElement(MESSAGES)}`;
};

const createComments = () => {
  const GENERATE_ID = getRandomIntFromRangeGenerator(1, 200);

  return {
    id: GENERATE_ID(),
    avatar: `img/avatar-${getInteger(1, 6)}.svg`,
    message: getMessage(1, 2),
    name: getRandomElement(NAMES)
  };
};

const createObjects = () => {
  photo++;

  return {
    id: photo,
    url: `photos/${photo}.jpg`,
    description: `photo-${photo}`,
    likes: getInteger(15, 200),
    comments: Array.from({ length: getInteger(1, 20) }, createComments)
  };
};

const generateObjects = (count) => Array.from({ length: count }, createObjects);

export { generateObjects };
