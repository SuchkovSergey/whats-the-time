import { format, add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const createTime = (gmt) => {
  const minutes = gmt % 1 === 0 ? 0 : 30;
  const time = utcToZonedTime(add(new Date(), { hours: gmt, minutes }), { timeZone: 'Europe/London' });
  const clockTime = format(time, 'HH:mm:ss');
  const currentGMT = `${Math.floor(gmt / 1)}:${gmt % 1 === 0 ? '00' : '30'}`;
  const timeInfo = format(time, `LLLL do, EEEE, u 'GMT ${currentGMT}`);
  return { clockTime, timeInfo };
};

export const clockUpdate = (gmt) => () => {
  const timeDiv = document.querySelector('.time-text');
  timeDiv.innerHTML = `<b>${createTime(gmt).clockTime}</b>`;
};

export const makeDropdown = (labelText, selectId) => {
  const form = document.createElement('form');
  form.classList.add('option-text');
  const label = document.createElement('label');
  label.innerHTML = labelText;
  const select = document.createElement('select');
  select.id = selectId;
  select.classList.add('option');
  form.append(label, select);
  return form;
};

export const regionOptionsUpdate = (countries) => {
  const select = document.getElementById('regions');
  select.innerHTML = '';
  const options = countries.map((el) => `<option id="region-option" value="${el}">${el}</option>`).join('');
  select.innerHTML = options;
};

export const countryOptionsUpdate = (countries) => {
  const select = document.getElementById('countries');
  select.innerHTML = '';
  const options = countries.map((el) => `<option id="country-option" value="${el}">${el}</option>`).join('');
  select.innerHTML = options;
};

export const cityOptionsUpdate = (cities) => {
  const select = document.getElementById('cities');
  select.innerHTML = '';
  const options = cities.map((el) => `<option id="city-option" value="${el}">${el}</option>`).join('');
  select.innerHTML = options;
};

export const imagesUpdate = (code, gmt) => {
  document
    .getElementById('flag')
    .innerHTML = `<img class="flag-image center" src="https://lipis.github.io/flag-icon-css/flags/1x1/${code}.svg">`;
  document
    .getElementById('map')
    .innerHTML = `<img class="map-image center" src="https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/1024.png">`;
  document
    .querySelector('.info-element')
    .innerHTML = `<div class="info-text""><b>${createTime(gmt).timeInfo}</b></div>`;
};
