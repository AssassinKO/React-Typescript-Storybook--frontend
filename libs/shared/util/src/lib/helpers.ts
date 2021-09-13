import kebabCase from 'lodash/kebabCase';

export const toggledArray = <K extends unknown>(array: K[], value: K) =>
  array.includes(value) ? array.filter((e) => e !== value) : [...array, value];

export const objectToQueryString = (obj) => {
  const str = [];
  for (const p in obj)
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const createCitySlug = (cityName) => kebabCase(cityName.toLowerCase());
