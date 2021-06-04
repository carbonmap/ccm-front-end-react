import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './isLoading';
import menuReducer from './menuOpen';
import mobilereducer from './isMobile';
import locationReducer from './selectedLocaiton';

const rootReducer = combineReducers({
    isMobile: mobilereducer,
    isLoading: loadingReducer,
    menuOpen: menuReducer,
    selectedLocation: locationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;