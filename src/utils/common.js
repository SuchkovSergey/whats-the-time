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
