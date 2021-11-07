import { PayloadAction } from "@reduxjs/toolkit";
import { OPEN, CLOSED } from 'src/constants/actionTypes'

const menuReducer = (state = false, action: PayloadAction) => {
    switch(action.type) {
        case OPEN:
            return true;
        case CLOSED:
            return false;
        default:
            return state;
    }
}

export default menuReducer;