import { PayloadAction } from "@reduxjs/toolkit";
import {  HIDE_ERROR,SET_ERROR } from '../../constants/actionTypes'


const errorReducer = (state: {error: null, isOpen: false}, action: PayloadAction) => {
    switch(action.type) {
        case SET_ERROR:
            return {
                error: Error,
                isOpen: true
            };
        case HIDE_ERROR:
            return {
                error: null,
                isOpen: false
            }
        default:
            return state;
    }
}

export default errorReducer;