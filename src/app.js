import {
    updateImages,
    setCountryOptions,
    setCityOptions,
    setContinentsOptions,
} from './utils/common';
import { setSelectListeners, setInitialOption } from './utils/init';
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
