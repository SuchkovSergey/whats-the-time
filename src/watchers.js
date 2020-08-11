import { watch } from 'melanke-watchjs';
import {
  clockUpdate, imagesUpdate, cityOptionsUpdate, countryOptionsUpdate,
} from './utils';
import info from './mainInfo';

const watchState = (state) => {
  watch(state, 'currentRegion', () => {
    countryOptionsUpdate(info[state.currentRegion].map((el) => el.countryName));
    imagesUpdate(state.currentCode, state.currentGMT);
  });

  watch(state, 'currentCountry', () => {
    cityOptionsUpdate(Object
      .keys(info[state.currentRegion]
        .find((el) => el.countryName === state.currentCountry)
        .cities));
    imagesUpdate(state.currentCode, state.currentGMT);
  });

  let clock = setInterval(clockUpdate(state.currentGMT), 1000);

  watch(state, 'currentCity', () => {
    clearInterval(clock);
    setTimeout(clockUpdate(state.currentGMT), 0);
    clock = setInterval(clockUpdate(state.currentGMT), 1000);
    imagesUpdate(state.currentCode, state.currentGMT);
  });
};

export default watchState;
