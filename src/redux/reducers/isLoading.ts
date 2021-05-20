import { PayloadAction } from "@reduxjs/toolkit";

const loadingReducer = (state = true, action: PayloadAction) => {
    switch(action.type) {
        case 'LOADED':
            return false;
        default:
            return state;
    }
}

export default loadingReducer;