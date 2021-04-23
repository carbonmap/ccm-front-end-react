import { combineReducers } from '@reduxjs/toolkit';
import loadingReducer from './isLoading';
import menuReducer from './menuOpen';
import mobilereducer from './isMobile';

const rootReducer = combineReducers({
    isMobile: mobilereducer,
    isLoading: loadingReducer,
    menuOpen: menuReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;