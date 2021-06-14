import React, { Dispatch } from 'react';
import { Action } from 'redux';
import { screenLg, screenSm } from '../../../redux/actions';

    export function handleWindowSizeChange(dispatch: Dispatch<Action>) {
        if(window.innerWidth < 1025) {
            dispatch(screenSm())
            console.log("Small Screen")
        } else {
            dispatch(screenLg())
            console.log("large screen")
        }
    }