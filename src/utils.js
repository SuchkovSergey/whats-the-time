import { format, add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const createTime = (minutes = 0, strOffset = '+00:00') => {
  const time = utcToZonedTime(add(new Date(), { minutes }), 'Europe/London');
  const clockTime = format(time, 'HH:mm:ss');
  const timeInfo = format(time, `LLLL do, EEEE, u 'GMT ${strOffset}`);
  return { clockTime, timeInfo };
};

export const clockUpdate = (offset) => () => {
  const timeDiv = document.querySelector('.time-text');
  timeDiv.innerHTML = `<b>${createTime(offset).clockTime}</b>`;
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

export const continentsOptionsUpdate = makeOptionsUpdate('continents');
export const countryOptionsUpdate = makeOptionsUpdate('countries');
export const cityOptionsUpdate = makeOptionsUpdate('cities');

export const imagesUpdate = (code, offset, strOffset) => {
  document
    .querySelector('.info-text')
    .innerHTML = `<b>${createTime(offset, strOffset).timeInfo}</b>`;
  document
    .getElementById('flag')
    .className = `flag-image center fi fi-${code.toLowerCase()} fis`;
  document
    .getElementById('map')
    .innerHTML = `<img class="map-image center" src="https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code.toLowerCase()}/1024.png">`;
};
