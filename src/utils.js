import { format, add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const createTime = (gmt) => {
  const minutes = gmt % 1 === 0 ? 0 : 30;
  const time = utcToZonedTime(add(new Date(), { hours: gmt, minutes }), { timeZone: 'Europe/London' });
  const clockTime = format(time, 'hh:mm:ss bbb');
  const currentGMT = gmt % 1 === 0 ? `${gmt}:00` : `${gmt - 0.5}:30`;
  const timeInfo = format(time, `LLLL do, EEEE, u 'GMT ${currentGMT}`);
  return { clockTime, timeInfo };
};

const clockUpdate = (gmt) => () => {
  const timeDiv = document.querySelector('.time-element');
  timeDiv.innerHTML = `The time is <b>${createTime(gmt).clockTime}</b>`;
};

const countryOptionsUpdate = (countries) => {
  const select = document.getElementById('countries');
  select.innerHTML = '';
  const options = countries.sort().map((el) => `<option id="country-option" value="${el}">${el}</option>`).join('');
  select.innerHTML = options;
};

const cityOptionsUpdate = (cities) => {
  const select = document.getElementById('cities');
  select.innerHTML = '';
  const options = cities.sort().map((el) => `<option id="city-option" value="${el}">${el}</option>`).join('');
  select.innerHTML = options;
};

const imagesUpdate = (code, gmt) => {
  const flagDiv = document.getElementById('flag');
  const mapDiv = document.getElementById('map');
  const infoDiv = document.querySelector('.info-element');
  flagDiv.innerHTML = `<img class="flag-image center" src="https://lipis.github.io/flag-icon-css/flags/1x1/${code}.svg">`;
  mapDiv.innerHTML = `<img class="map-image center" src="https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/1024.png">`;
  infoDiv.innerHTML = `<div class="info-text"">${createTime(gmt).timeInfo}</div>`;
};

export {
  createTime, clockUpdate, imagesUpdate, countryOptionsUpdate, cityOptionsUpdate,
};
