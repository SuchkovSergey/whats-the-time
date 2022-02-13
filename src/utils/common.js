import { format, add } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export const createTime = (offset = 0, strOffset = '+00:00') => {
    const currentTime = add(new Date(), { minutes: offset });
    const zonedTime = utcToZonedTime(currentTime, 'Europe/London');
    const clockTime = format(zonedTime, 'HH:mm:ss');
    const timeInfo = format(zonedTime, `LLLL do, EEEE, u 'GMT ${strOffset}`);
    return { clockTime, timeInfo };
};

export const updateClocks = (offset) => () => {
    const timeDiv = document.querySelector('.time-text');
    timeDiv.innerHTML = `<b>${createTime(offset).clockTime}</b>`;
};

export const createDropdown = (labelText, selectId) => {
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

const updateOptionsByType = (type) => (elements) => {
    document.getElementById(type).innerHTML = elements
        .map((el) => `<option id="${type}-option" value="${el}">${el}</option>`)
        .join('');
};

export const setContinentsOptions = (state) => {
    const { timeZonesInfo } = state;
    const options = Object.keys(timeZonesInfo);
    updateOptionsByType('continents')(options);
};

export const setCountryOptions = (state) => {
    const { timeZonesInfo, continent } = state;
    const options = Object.keys(timeZonesInfo[continent]);
    updateOptionsByType('countries')(options);
};

export const setCityOptions = (state) => {
    const { timeZonesInfo, continent, country } = state;
    const options = Object.keys(timeZonesInfo[continent][country].cities).sort();
    updateOptionsByType('cities')(options);
};

export const updateImages = (state) => {
    const { code, timeOffset, timeOffsetText } = state;
    const codeInLowerCase = code.toLowerCase();

    document
        .querySelector('.info-text').innerHTML = `<b>${createTime(timeOffset, timeOffsetText).timeInfo}</b>`;
    document
        .getElementById('flag').className = `flag-image center fi fi-${codeInLowerCase} fis`;
    document
        .getElementById('map').innerHTML = `<img class="map-image center" src="https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${codeInLowerCase}/1024.png">`;
};

const defineZoneInformation = (type) => (state) => {
    const { timeZonesInfo, continent, country } = state;
    return timeZonesInfo[continent][country][type];
};

const defineCities = defineZoneInformation('cities');
const defineCode = defineZoneInformation('code');

export const setInitialOption = (state) => {
    const firstContinent = Object.entries(state.timeZonesInfo)[0];
    const [ continentName, continentData ] = firstContinent;
    const firstCountry = Object.entries(continentData)[0];
    const [ countryName, countryData ] = firstCountry;
    const { code, cities } = countryData;
    const firstCity = Object.entries(cities)[0];
    const [ cityName, cityData ] = firstCity;

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
        const [ country, { cities, code } ] = Object.entries(state.timeZonesInfo[continentName])[0];
        const cityInfo = Object.entries(cities)[0];
        state.continent = continentName;
        state.country = country;
        state.city = cityInfo[0];
        state.timeOffset = cityInfo[1].offset;
        state.timeOffsetText = cityInfo[1].strOffset;
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