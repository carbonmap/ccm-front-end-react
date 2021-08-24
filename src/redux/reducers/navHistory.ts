import { PayloadAction } from '@reduxjs/toolkit';
import { NAVIGATION_HISTORY } from '../../constants/actionTypes'

const historyReducer = (state:any = ["uk.ac.cam.kings"], action: PayloadAction) => {
    switch(action.type) {
        case NAVIGATION_HISTORY:
            return state = action.payload;
        default: return state;
    }
};

export default historyReducer;