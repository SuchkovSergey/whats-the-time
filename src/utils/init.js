import { createTime } from './common';

const createDropdown = (labelText, selectId) => {
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

const createHeader = () => {
    const head = document.createElement('div');
    head.classList.add('header');
    head.textContent = "What's the time in...";
    return head;
};

const createDropdowns = () => {
    const dropdownDiv = document.createElement('div');
    dropdownDiv.id = 'dropdowns';
    const dropdownContinent = createDropdown('Choose the continent', 'continents');
    const dropdownCountry = createDropdown('Choose the country', 'countries');
    const dropdownCity = createDropdown('Choose the city', 'cities');
    dropdownDiv.append(dropdownContinent, dropdownCountry, dropdownCity);
    return dropdownDiv;
};

const createMainBody = () => {
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

const githubLink = '<a href="https://github.com/SuchkovSergey">GitHub account.</a>';

const createFooter = () => {
    const footerElement = document.createElement('footer');
    footerElement.classList.add('footer-copyright');
    footerElement.innerHTML = `© Sergey Suchkov, 2020.  Welcome to my ${githubLink}`;
    return footerElement;
};

// Connecting parts of the site to the "body"-element in DOM
export const initDOM = () => {
    const element = document.getElementById('point');
    element.append(createHeader(), createDropdowns(), createMainBody(), createFooter());
};

const defineZoneInformation = (type) => (state) => {
    const { timeZonesInfo, continent, country } = state;
    return timeZonesInfo[continent][country][type];
};

const defineCities = defineZoneInformation('cities');
const defineCode = defineZoneInformation('code');

export const setInitialOption = (state) => {
    const firstContinent = Object.entries(state.timeZonesInfo)[0];
    const [continentName, continentData] = firstContinent;
    const firstCountry = Object.entries(continentData)[0];
    const [countryName, countryData] = firstCountry;
    const { code, cities } = countryData;
    const firstCity = Object.entries(cities)[0];
    const [cityName, cityData] = firstCity;

    state.continent = continentName;
    state.country = countryName;
    state.code = code;
    state.city = cityName;
    state.timeOffset = cityData.offset;
    state.timeOffsetText = cityData.strOffset;
};

export const setSelectListeners = (state) => {
    const continentOptions = document.querySelector('#continents');
    const countryOptions = document.querySelector('#countries');
    const cityOptions = document.querySelector('#cities');

    continentOptions.addEventListener('change', ({ target }) => {
        const continentName = target.value;
        const [country, { cities, code }] = Object.entries(state.timeZonesInfo[continentName])[0];
        const cityInfo = Object.entries(cities)[0];
        const [cityName, cityData] = cityInfo;
        state.continent = continentName;
        state.country = country;
        state.city = cityName;
        state.timeOffset = cityData.offset;
        state.timeOffsetText = cityData.strOffset;
        state.code = code;
    });

    countryOptions.addEventListener('change', ({ target }) => {
        state.country = target.value;
        const currentCities = defineCities(state);
        const city = Object.keys(currentCities)[0];
        state.city = city;
        state.timeOffset = currentCities[city].offset;
        state.timeOffsetText = currentCities[city].strOffset;
        state.code = defineCode(state);
    });

    cityOptions.addEventListener('change', ({ target }) => {
        const city = target.value;
        state.city = city;
        const { offset, strOffset } = defineCities(state)[city];
        state.timeOffset = offset;
        state.timeOffsetText = strOffset;
        state.code = defineCode(state);
    });
};
