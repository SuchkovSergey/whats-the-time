import { format } from 'date-fns';

const info = [
  {
    id: 1,
    countryName: 'Russia',
    flag: 'https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/RS-flag.jpg',
    map: 'https://vemaps.com/uploads/img/large/ru-05.jpg',
    cities: {
      Moscow: 3,
      'Saint Peterburg': 3,
      Kazan: 3,
    },
  },
  {
    id: 2,
    countryName: 'Germany',
    flag: 'https://www.cia.gov/library/publications/the-world-factbook/attachments/flags/GM-flag.jpg',
    map: 'https://vemaps.com/uploads/img/large/de-05.jpg',
    cities: {
      Berlin: 2,
      Munich: 2,
      Frankfurt: 2,
    },
  },
];

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
time.setHours(time.getHours() + 0); // magic number
const finalTime = format(time, 'PPpp');

timeDiv.classList.add('time-element');
timeDiv.innerHTML = `The time is <b>${finalTime}</b>`;

const flagDiv = document.createElement('div');
flagDiv.innerHTML = `<img src="${info[1].flag}" class="flag-image center""></img>`;

const mapDiv = document.createElement('div');
mapDiv.innerHTML = `<img src="${info[1].map}" class="map-image center""></img>`;

const headerInit = () => {
  const h2 = document.createElement('h2');
  h2.classList.add('dropdown');
  h2.innerText = "What's the time in...";
  h2.classList.add('bg-light', 'border-bottom', 'text-center');
  return h2;
};

const footer = () => {
  const footerElement = document.createElement('footer');
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-copyright', 'text-center', 'py-3');
  const copyrightLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';
  copyrightDiv.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${copyrightLink}`;
  footerElement.classList.add('page-footer', 'bg-light', 'border-top');
  footerElement.append(copyrightDiv);
  return footerElement;
};

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element
    .append(headerInit(), dropdownCountry(), dropdownCity(), timeDiv, flagDiv, mapDiv, footer());
};
