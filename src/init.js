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

const dropdownCountryInit = () => {
  const form = document.createElement('form');
  const label = document.createElement('label');
  label.innerHTML = 'Choose the country';
  const select = document.createElement('select');
  select.id = 'countries';
  const options = info.map((el) => `<option value="${el.countryName}">${el.countryName}</option>`).join('');
  select.innerHTML = options;
  form.append(label, select);
  return form;
};

const dropdownCityInit = () => {
  const form = document.createElement('form');
  const label = document.createElement('label');
  label.innerHTML = 'Choose the city';
  const select = document.createElement('select');
  select.id = 'cities';
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
timeDiv.innerHTML = `The time is ${time}`;

const flagDiv = document.createElement('div');
flagDiv.innerHTML = `<img src="${info[0].flag}" style="width:400px;height:250px;"></img>`;

const mapDiv = document.createElement('div');
mapDiv.innerHTML = `<img src="${info[0].map}" style="width:500px;height:300px;"></img>`;

const headerInit = () => {
  const divElement = document.createElement('div');
  divElement.classList.add('dropdown');
  divElement.innerText = "What's the time in...";
  divElement.classList.add('page-footer', 'bg-light', 'border-bottom', 'text-center');
  return divElement;
};

const footerInit = () => {
  const footer = document.createElement('footer');
  footer.setAttribute('style', 'position: fixed; bottom: 0; left: 0; right: 0');
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-copyright', 'text-center', 'py-3');
  const copyrightLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';
  copyrightDiv.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${copyrightLink}`;
  footer.classList.add('page-footer', 'bg-light', 'border-top');
  footer.append(copyrightDiv);
  return footer;
};

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element.append(headerInit(), dropdownCountryInit(), dropdownCityInit(), timeDiv, flagDiv, mapDiv, footerInit());
};
