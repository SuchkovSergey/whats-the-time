import _ from 'lodash';
import { createTime } from './utils';
import info from './mainInfo';

const dropdownRegion = () => {
  const form = document.createElement('form');
  form.classList.add('option-text');
  const label = document.createElement('label');
  label.innerHTML = 'Choose the region';
  const select = document.createElement('select');
  select.id = 'regions';
  select.classList.add('option');
  const options = Object.keys(info).map((el) => `<option id="region-option" value="${_.upperFirst(el)}">${_.upperFirst(el)}</option>`).join('');
  select.innerHTML = options;
  form.append(label, select);
  return form;
};

const dropdownCountry = () => {
  const form = document.createElement('form');
  form.classList.add('option-text');
  const label = document.createElement('label');
  label.innerHTML = 'Choose the country';
  const select = document.createElement('select');
  select.id = 'countries';
  select.classList.add('option');
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
  form.append(label, select);
  return form;
};

const timeDiv = document.createElement('div');
timeDiv.classList.add('time-element');
timeDiv.innerHTML = `The time is <b>${createTime(0).clockTime}</b>`;

const flagDiv = document.createElement('div');
flagDiv.id = 'flag';

const mapDiv = document.createElement('div');
mapDiv.id = 'map';

const infoDiv = document.createElement('div');
infoDiv.classList.add('info-element', 'center');
infoDiv.innerHTML = `<div class="info-text"">${createTime(0).timeInfo}</div>`;

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
    .append(headerInit(), dropdownRegion(), dropdownCountry(), dropdownCity(), main, footer());
};
