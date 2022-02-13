import _ from 'lodash';
import codeLookup from 'country-code-lookup';
import countriesAndTimezones from 'countries-and-timezones';

const cityNamePrettier = (cityName) => _.replace(cityName, new RegExp('_', 'g'), ' ');
const sortByCountryName = (a, b) => (a.countryName > b.countryName ? 1 : -1);

const mapper = ([key, value]) => {
    const code = value.country;
    const currentCountry = codeLookup.countries.find(({ iso2 }) => iso2 === code);
    const cityName = cityNamePrettier(key.split('/')[1]);
    if (!currentCountry || !code || cityName === '' || cityName.includes('+')) {
        return null;
    }
    return {
        continentName: currentCountry.continent,
        countryName: currentCountry.country,
        cityName,
        code,
        offset: value.utcOffset,
        strOffset: value.utcOffsetStr,
    };
};

const reducer = (acc, element) => {
    const {
        cityName, countryName, continentName, offset, strOffset, code,
    } = element;
    const newElement = { offset, strOffset };
    if (!acc[continentName]) {
        acc[continentName] = {
            [countryName]: {
                code,
                cities: {
                    [cityName]: newElement,
                },
            },
        };
    } else if (!acc[continentName][countryName]) {
        acc[continentName][countryName] = {
            code,
            cities: {
                [cityName]: newElement,
            },
        };
    } else {
        acc[continentName][countryName].cities[cityName] = newElement;
    }
    return acc;
};

const getTimeZonesInfo = () => Object
    .entries(countriesAndTimezones.getAllTimezones())
    .map(mapper)
    .filter((x) => x)
    .sort(sortByCountryName)
    .reduce(reducer, {});

export default getTimeZonesInfo;
