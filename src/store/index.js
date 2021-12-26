import { configureStore } from "@reduxjs/toolkit";
import currenciesReducer from './currency-slice';
import currenciesToDisplayReducer from './currenciesToDisplay-slice'

const store = configureStore({
    reducer: {
        currencies: currenciesReducer,
        currenciesToDisplay: currenciesToDisplayReducer,
    },
});

export default store;