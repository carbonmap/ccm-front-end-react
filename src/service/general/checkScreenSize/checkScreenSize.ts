import React, { Dispatch } from 'react';
import { Action } from 'redux';
import { screenLg, screenSm } from '../../../redux/actions';
import { mobileDeviceWidth } from '../../../constants';

export function handleWindowSizeChange(dispatch: Dispatch<Action>) {
    if(window.innerWidth < mobileDeviceWidth) {
        dispatch(screenSm());
    } else {
        dispatch(screenLg());
    };
};