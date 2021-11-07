import { PayloadAction } from "@reduxjs/toolkit";
import { LOADED } from 'src/constants/actionTypes'

const loadingReducer = (state = true, action: PayloadAction) => {
    switch(action.type) {
        case LOADED:
            return false;
        default:
            return state;
    }
}

export default loadingReducer;