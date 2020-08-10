import { format } from 'date-fns';

const info = [
  {
    id: 1,
    countryName: 'Russia',
    flag: 'de',
    map: 'de',
    cities: {
      Moscow: 3,
      'Saint Peterburg': 3,
      Kazan: 3,
    },
  },
  {
    id: 2,
    countryName: 'Germany',
    flag: 'ru',
    map: 'ru',
    cities: {
      Berlin: 2,
      Munich: 2,
      Frankfurt: 2,
    },
  },
];

const country = 'in';
const gmt = 0;

const dropdownCountry = () => {
  const form = document.createElement('form');
  form.classList.add('option-text');
  const label = document.createElement('label');
  label.innerHTML = 'Choose the country';
  const select = document.createElement('select');
  select.id = 'countries';
  select.classList.add('option');
  const options = info.map((el) => `<option value="${el.countryName}">${el.countryName}</option>`).join('');
  select.innerHTML = options;
  form.append(label, select);
  return form;
};

const dropdownCity = () => {
  const form = document.createElement('form');
  form.classList.add('option-text');
  const label = document.createElement('label');
  label.innerHTML = 'Choose the city';
  const select = document.createElement('select');
  select.id = 'cities';
  select.classList.add('option');
  // const currentCountry = document.getElementById('countries').textContent;
  const options = Object
    .keys(info.find((el) => el.countryName === 'Russia').cities) // 'currentCountry'
    .map((el) => `<option value="${el}">${el}</option>`)
    .join('');
  select.innerHTML = options;
  form.append(label, select);
  return form;
};

const timeDiv = document.createElement('div');
const time = new Date();
time.setHours(time.getHours() + gmt);
const clockTime = format(time, 'hh:mm:ss bbb');
const timeInfo = format(time, 'LLLL do, EEEE, u OOOO');

timeDiv.classList.add('time-element');
timeDiv.innerHTML = `The time is <b>${clockTime}</b>`;

const flagDiv = document.createElement('div');
flagDiv.innerHTML = `<img class="flag-image center" src="https://lipis.github.io/flag-icon-css/flags/1x1/${country}.svg">`;

const mapDiv = document.createElement('div');
mapDiv.innerHTML = `<img class="map-image center" src="https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${country}/1024.png">`;

const infoDiv = document.createElement('div');
infoDiv.classList.add('info-element', 'center');
infoDiv.innerHTML = `<div class="info-text"">${timeInfo}</div>`;

const headerInit = () => {
  const head = document.createElement('h1');
  head.classList.add('dropdown');
  head.innerText = "What's the time in...";
  head.classList.add('border-bottom', 'text-center');
  return head;
};

const footer = () => {
  const footerElement = document.createElement('footer');
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-copyright', 'text-center', 'py-3');
  const copyrightLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';
  copyrightDiv.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${copyrightLink}`;
  footerElement.classList.add('page-footer', 'border-top');
  footerElement.append(copyrightDiv);
  return footerElement;
};

const main = document.createElement('div');
main.append(timeDiv, flagDiv, mapDiv, infoDiv);

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element
    .append(headerInit(), dropdownCountry(), dropdownCity(), main, footer());
};
