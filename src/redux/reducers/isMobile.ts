import { PayloadAction } from '@reduxjs/toolkit';
import { DESKTOP, MOBILE } from 'src/constants/actionTypes'

const mobileReducer = (state = false, action: PayloadAction) => {
    switch(action.type) {
        case DESKTOP:
            return false;
        case MOBILE:
            return true;
        default: return state;
    }
}

export default mobileReducer;