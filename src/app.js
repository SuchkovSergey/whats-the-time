import {
  imagesUpdate, countryOptionsUpdate, cityOptionsUpdate, continentsOptionsUpdate,
} from './utils';
import info from './mainInfo';
import watchState from './watchers';

const app = () => {
  const state = {
    currentContinent: 'Asia',
    currentCountry: 'Afghanistan',
    currentCity: 'Kabul',
    currentCode: 'AF',
    currentOffset: 270,
    currentStrOffset: '+04:30',
  };

  const continentOptions = document.querySelector('#continents');
  const countryOptions = document.querySelector('#countries');
  const cityOptions = document.querySelector('#cities');

  const defineOffsets = (continent) => Object.values(Object.values(info[continent])[0].cities)[0];
  const defineCities = (stat) => info[stat.currentContinent][stat.currentCountry].cities;
  const defineCode = (stat) => info[stat.currentContinent][stat.currentCountry].code;

  continentOptions.addEventListener('change', (el) => {
    const continent = el.target.value;
    const [country] = Object.keys(info[continent]);
    const [currentCity] = Object.keys(Object.values(info[continent])[0].cities);
    state.currentContinent = continent;
    state.currentCountry = country;
    state.currentCity = currentCity;
    state.currentOffset = defineOffsets(continent).offset;
    state.currentStrOffset = defineOffsets(continent).strOffset;
    state.currentCode = Object.values(info[continent])[0].code;
  });

  countryOptions.addEventListener('change', (el) => {
    state.currentCountry = el.target.value;
    const city = Object.keys(defineCities(state))[0];
    state.currentCity = city;
    state.currentOffset = defineCities(state)[city].offset;
    state.currentStrOffset = defineCities(state)[city].strOffset;
    state.currentCode = defineCode(state);
  });

  cityOptions.addEventListener('change', (el) => {
    const city = el.target.value;
    state.currentCity = city;
    state.currentOffset = defineCities(state)[city].offset;
    state.currentStrOffset = defineCities(state)[city].strOffset;
    state.currentCode = defineCode(state);
  });

  continentsOptionsUpdate(Object.keys(info));
  countryOptionsUpdate(Object.keys(info[state.currentContinent]));
  cityOptionsUpdate(Object.keys(defineCities(state)).sort());
  imagesUpdate(state.currentCode, state.currentOffset, state.currentStrOffset);
  watchState(state);
};

export default app;
