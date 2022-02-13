import { watch } from 'melanke-watchjs';
import {
    updateClocks,
    updateImages,
    setCityOptions,
    setCountryOptions,
} from '../utils/common';

const watchState = (state) => {
    watch(state, () => {
        updateImages(state);
    });

    watch(state, 'continent', () => {
        setCountryOptions(state);
    });

    watch(state, 'country', () => {
        setCityOptions(state);
    });

    let clockId = setInterval(updateClocks(state.timeOffset), 1000);

    watch(state, 'city', () => {
        clearInterval(clockId);
        setTimeout(updateClocks(state.timeOffset), 0);
        clockId = setInterval(updateClocks(state.timeOffset), 1000);
    });
};

export default watchState;
