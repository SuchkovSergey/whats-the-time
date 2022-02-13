import {
    updateImages,
    setCountryOptions,
    setCityOptions,
    setContinentsOptions,
    setSelectListeners,
    setInitialOption,
} from './utils/common';
import getTimeZonesInfo from './utils/timeZonesInfo';
import watchState from './watchers/index';

const app = () => {
    const state = {
        continent: '',
        country: '',
        city: '',
        code: '',
        timeOffset: 0,
        timeOffsetText: '',
    };

    state.timeZonesInfo = getTimeZonesInfo();

    setInitialOption(state);
    setSelectListeners(state);

    setContinentsOptions(state);
    setCountryOptions(state);
    setCityOptions(state);

    updateImages(state);
    watchState(state);
};

export default app;
