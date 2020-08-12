import { watch } from 'melanke-watchjs';
import {
  clockUpdate, imagesUpdate, cityOptionsUpdate, countryOptionsUpdate,
} from './utils';
import info from './mainInfo';

const watchState = (state) => {
  watch(state, () => { imagesUpdate(state.currentCode, state.currentGMT); });

  watch(state, 'currentRegion', () => {
    countryOptionsUpdate(info[state.currentRegion].map(({ countryName }) => countryName));
  });

  watch(state, 'currentCountry', () => {
    cityOptionsUpdate(Object
      .keys(info[state.currentRegion]
        .find(({ countryName }) => countryName === state.currentCountry)
        .cities));
  });

  let clock = setInterval(clockUpdate(state.currentGMT), 1000);

  watch(state, 'currentCity', () => {
    clearInterval(clock);
    setTimeout(clockUpdate(state.currentGMT), 0);
    clock = setInterval(clockUpdate(state.currentGMT), 1000);
  });
};

export default watchState;
