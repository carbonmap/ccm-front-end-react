import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './isLoading';
import menuReducer from './menuOpen';
import mobilereducer from './isMobile';
import locationReducer from './selectedLocation';
import errorReducer from './isError';

const rootReducer = combineReducers({
    isMobile: mobilereducer,
    isLoading: loadingReducer,
    menuOpen: menuReducer,
    selectedLocation: locationReducer,
    isError: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;