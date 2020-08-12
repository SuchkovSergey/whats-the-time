import { format, add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const createTime = (hours) => {
  const minutes = hours % 1 === 0 ? 0 : 30;
  const time = utcToZonedTime(add(new Date(), { hours, minutes }), { timeZone: 'Europe/London' });
  const clockTime = format(time, 'HH:mm:ss');
  const currentGMT = `${Math.floor(hours / 1)}:${hours % 1 === 0 ? '00' : '30'}`;
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

const makeOptionsUpdate = (name) => (elements) => {
  document.getElementById(name).innerHTML = elements
    .map((el) => `<option id="${name}-option" value="${el}">${el}</option>`)
    .join('');
};

export const regionOptionsUpdate = makeOptionsUpdate('regions');
export const countryOptionsUpdate = makeOptionsUpdate('countries');
export const cityOptionsUpdate = makeOptionsUpdate('cities');

export const imagesUpdate = (code, gmt) => {
  document
    .getElementById('flag')
    .innerHTML = `<img class="flag-image center" src="https://lipis.github.io/flag-icon-css/flags/1x1/${code}.svg">`;
  document
    .getElementById('map')
    .innerHTML = `<img class="map-image center" src="https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code}/1024.png">`;
  document
    .querySelector('.info-text')
    .innerHTML = `<b>${createTime(gmt).timeInfo}</b>`;
};
