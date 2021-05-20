import { PayloadAction } from '@reduxjs/toolkit';

const mobileReducer = (state = false, action: PayloadAction) => {
    switch(action.type) {
        case 'DESKTOP':
            return false;
        case 'MOBILE':
            return true;
        default: return state;
    }
}

export default mobileReducer;