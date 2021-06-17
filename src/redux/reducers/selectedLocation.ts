import { PayloadAction } from '@reduxjs/toolkit';
import { SET_LOCATION } from '../../constants/actionTypes'

const locationReducer = (state: any = null, action: PayloadAction) => {
    switch(action.type) {
        case SET_LOCATION:
            return state = action.payload;
        default: return state;
    }
};

export default locationReducer;