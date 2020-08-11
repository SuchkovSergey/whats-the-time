/* eslint no-param-reassign: "error" */

import { imagesUpdate, countryOptionsUpdate, cityOptionsUpdate } from './utils';
import info from './mainInfo';
import watchState from './watchers';

const app = () => {
  const state = {
    currentRegion: 'Europe',
    currentCountry: 'Russia',
    currentCity: 'Moscow',
    currentGMT: 3,
    currentCode: 'ru',
  };

  const regionOptions = document.querySelector('#regions');
  regionOptions.addEventListener('change', (el) => {
    const region = el.target.value;
    const country = info[region][0].countryName;
    const city = Object.keys(info[region][0].cities)[0];
    const gmt = info[region][0].cities[city];
    const { code } = info[region][0];
    state.currentRegion = region;
    state.currentCountry = country;
    state.currentCity = city;
    state.currentGMT = gmt;
    state.currentCode = code;
  });

  const countryOptions = document.querySelector('#countries');
  countryOptions.addEventListener('change', (el) => {
    state.currentCountry = el.target.value;
    const city = Object
      .keys(info[state.currentRegion]
        .find((e) => e.countryName === state.currentCountry)
        .cities)[0];
    const gmt = info[state.currentRegion]
      .find((e) => e.countryName === state.currentCountry)
      .cities[city];
    const { code } = info[state.currentRegion].find((e) => e.countryName === state.currentCountry);
    state.currentCity = city;
    state.currentGMT = gmt;
    state.currentCode = code;
  });

  const cityOptions = document.querySelector('#cities');
  cityOptions.addEventListener('change', (el) => {
    state.currentCity = el.target.value;
    const gmt = info[state.currentRegion]
      .find((e) => e.countryName === state.currentCountry)
      .cities[el.target.value];
    const { code } = info[state.currentRegion].find((e) => e.countryName === state.currentCountry);
    state.currentGMT = gmt;
    state.currentCode = code;
  });

  countryOptionsUpdate(info[state.currentRegion].map((e) => e.countryName));
  cityOptionsUpdate(Object
    .keys(info[state.currentRegion].find((e) => e.countryName === state.currentCountry)
      .cities));
  imagesUpdate('ru', state.currentGMT);
  watchState(state);
};

export default app;
export { countryOptionsUpdate, cityOptionsUpdate };
