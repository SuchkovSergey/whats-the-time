import { createTime, makeDropdown } from './utils';

const header = () => {
  const head = document.createElement('div');
  head.classList.add('header');
  head.textContent = "What's the time in...";
  return head;
};

const dropdowns = () => {
  const dropdownDiv = document.createElement('div');
  dropdownDiv.id = 'dropdowns';
  const dropdownContinent = makeDropdown('Choose the continent', 'continents');
  const dropdownCountry = makeDropdown('Choose the country', 'countries');
  const dropdownCity = makeDropdown('Choose the city', 'cities');
  dropdownDiv.append(dropdownContinent, dropdownCountry, dropdownCity);
  return dropdownDiv;
};

const main = () => {
  const { clockTime, timeInfo } = createTime();
  const flagDiv = document.createElement('div');
  flagDiv.id = 'flag';
  const mapDiv = document.createElement('div');
  mapDiv.id = 'map';
  const timeDiv = document.createElement('div');
  timeDiv.classList.add('time-element', 'center');
  timeDiv.innerHTML = `<div class="time-text""><b>${clockTime}</b></div>`;
  const infoDiv = document.createElement('div');
  infoDiv.classList.add('info-element', 'center');
  infoDiv.innerHTML = `<div class="info-text"">${timeInfo}</div>`;
  const mainDiv = document.createElement('div');
  mainDiv.append(timeDiv, flagDiv, mapDiv, infoDiv);
  return mainDiv;
};

const githubLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';

const footer = () => {
  const footerElement = document.createElement('footer');
  footerElement.classList.add('footer-copyright');
  footerElement.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${githubLink}`;
  return footerElement;
};

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element.append(header(), dropdowns(), main(), footer());
};
