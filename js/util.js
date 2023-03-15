const getInteger = (min, max) => {
  const MIN = Math.ceil(min);
  const MAX = Math.floor(max);

  if (min < 0 || min >= max) {
    throw new Error(`Значение min: ${min} превышает значение max: ${max}, или указано отрицательное число`);
  }

  return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
};

const getRandomIntFromRangeGenerator = (min, max) => {
  const PREVIOUS_VALUES = [];

  return () => {
    let currentValue = getInteger(min, max);

    if (PREVIOUS_VALUES.length >= (max - min + 1)) {
      throw new Error(`Перебраны все числа диапазона от ${min} до ${max}`);
    }

    while (PREVIOUS_VALUES.includes(currentValue)) {
      currentValue = getInteger(min, max);
    }

    PREVIOUS_VALUES.push(currentValue);
    return currentValue;
  };
};

const getRandomElement = (element) => element[getInteger(0, element.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getInteger, getRandomElement, getRandomIntFromRangeGenerator, isEscapeKey };
