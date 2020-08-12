import {
  imagesUpdate, countryOptionsUpdate, cityOptionsUpdate, regionOptionsUpdate,
} from './utils';
import info from './mainInfo';
import watchState from './watchers';

const app = () => {
  const state = {
    currentRegion: 'Europe',
    currentCountry: 'Russian Federation',
    currentCity: 'Moscow',
    currentGMT: 3,
    currentCode: 'ru',
  };

  const regionOptions = document.querySelector('#regions');
  const countryOptions = document.querySelector('#countries');
  const cityOptions = document.querySelector('#cities');

  const code = (currentState) => info[currentState.currentRegion]
    .find((e) => e.countryName === currentState.currentCountry)
    .code;
  const gmt = (city) => info[state.currentRegion]
    .find((e) => e.countryName === state.currentCountry)
    .cities[city];
  const cities = Object
    .keys(info[state.currentRegion]
      .find((e) => e.countryName === state.currentCountry).cities);

  regionOptions.addEventListener('change', (el) => {
    const region = el.target.value;
    const city = Object.keys(info[region][0].cities)[0];
    state.currentRegion = region;
    state.currentCountry = info[region][0].countryName;
    state.currentCity = city;
    state.currentGMT = info[region][0].cities[city];
    state.currentCode = info[region][0].code;
  });

  countryOptions.addEventListener('change', (el) => {
    state.currentCountry = el.target.value;
    const city = cities[0];
    state.currentCity = city;
    state.currentGMT = gmt(city);
    state.currentCode = code(state);
  });

  cityOptions.addEventListener('change', (el) => {
    const city = el.target.value;
    state.currentCity = city;
    state.currentGMT = gmt(city);
    state.currentCode = code(state);
  });

  regionOptionsUpdate(Object.keys(info));
  countryOptionsUpdate(info[state.currentRegion].map((e) => e.countryName));
  cityOptionsUpdate(cities);
  imagesUpdate(state.currentCode, state.currentGMT);
  watchState(state);
};

export default app;
