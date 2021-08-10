import { PayloadAction } from "@reduxjs/toolkit";
import {  HIDE_ERROR,SET_ERROR } from '../../constants/actionTypes'

const initState = {
    error: null,
    isOpen: false
};

const errorReducer = (state= initState, action: PayloadAction) => {

    switch(action.type) {
        case SET_ERROR:
            return {
                error: action.payload,
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