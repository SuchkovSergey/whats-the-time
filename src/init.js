// import _ from 'lodash';
import { createTime, makeDropdown } from './utils';

const dropdownRegion = makeDropdown('Choose the region', 'regions');
const dropdownCountry = makeDropdown('Choose the country', 'countries');
const dropdownCity = makeDropdown('Choose the city', 'cities');

const flagDiv = document.createElement('div');
flagDiv.id = 'flag';

const mapDiv = document.createElement('div');
mapDiv.id = 'map';

const timeDiv = document.createElement('div');
timeDiv.classList.add('time-element', 'center');
timeDiv.innerHTML = `<div class="time-text""><b>${createTime(0).clockTime}</b></div>`;

const infoDiv = document.createElement('div');
infoDiv.classList.add('info-element', 'center');
infoDiv.innerHTML = `<div class="info-text"">${createTime(0).timeInfo}</div>`;

const headerInit = () => {
  const head = document.createElement('div');
  head.classList.add('header');
  head.innerText = "What's the time in...";
  return head;
};

const footer = () => {
  const footerElement = document.createElement('footer');
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-copyright'); // не работает
  const copyrightLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';
  copyrightDiv.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${copyrightLink}`;
  footerElement.append(copyrightDiv);
  return footerElement;
};

const main = document.createElement('div');
main.id = 'main';
main.append(timeDiv, flagDiv, mapDiv, infoDiv);

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element
    .append(headerInit(), dropdownRegion, dropdownCountry, dropdownCity, main, footer());
};
