// import _ from 'lodash';
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
  const dropdownRegion = makeDropdown('Choose the region', 'regions');
  const dropdownCountry = makeDropdown('Choose the country', 'countries');
  const dropdownCity = makeDropdown('Choose the city', 'cities');
  dropdownDiv.append(dropdownRegion, dropdownCountry, dropdownCity);
  return dropdownDiv;
};

const main = () => {
  const { clockTime, timeInfo } = createTime(0);
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

const footer = () => {
  const footerElement = document.createElement('footer');
  footerElement.classList.add('footer-copyright');
  const copyrightLink = '<a href="https://github.com/Sergey89274291549">GitHub account.</a>';
  footerElement.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${copyrightLink}`;
  return footerElement;
};

// Connecting parts of the site to the "body"-element in DOM
export default () => {
  const element = document.getElementById('point');
  element.append(header(), dropdowns(), main(), footer());
};
