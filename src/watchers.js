import { watch } from 'melanke-watchjs';
import {
  clockUpdate, imagesUpdate, cityOptionsUpdate, countryOptionsUpdate,
} from './utils';
import info from './mainInfo';

const watchState = (state) => {
  watch(state, () => {
    const { currentCode, currentOffset, currentStrOffset } = state;
    imagesUpdate(currentCode, currentOffset, currentStrOffset);
  });

  watch(state, 'currentContinent', () => {
    const countries = Object.keys(info[state.currentContinent]);
    countryOptionsUpdate(countries);
  });

  watch(state, 'currentCountry', () => {
    const cities = Object.keys(info[state.currentContinent][state.currentCountry].cities).sort();
    cityOptionsUpdate(cities);
  });

  let clock = setInterval(clockUpdate(state.currentOffset), 1000);

  watch(state, 'currentCity', () => {
    clearInterval(clock);
    setTimeout(clockUpdate(state.currentOffset), 0);
    clock = setInterval(clockUpdate(state.currentOffset), 1000);
  });
};

export default watchState;
