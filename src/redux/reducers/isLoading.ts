import { PayloadAction } from "@reduxjs/toolkit";
import { LOADED } from '../../constants/actionTypes'

const loadingReducer = (state = true, action: PayloadAction) => {
    switch(action.type) {
        case LOADED:
            return false;
        default:
            return state;
    }
}

export default loadingReducer;