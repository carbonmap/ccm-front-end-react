import * as Constants from 'src/constants/actionTypes';

export const screenSm = () => {
    return {
        type: Constants.MOBILE
    }
}
export const screenLg = () => {
    return {
        type: Constants.DESKTOP
    }
}

export const endLoading = () => {
    return {
        type: Constants.LOADED
    }
}

export const menuOpen = () => {
    return {
        type: Constants.OPEN
    }
}
export const menuClosed = () => {
    return {
        type: Constants.CLOSED
    }
}

export const selectLocation = (location: object) => {
    return {
        type: Constants.SET_LOCATION,
        payload: location
    }
}

export function setError(error: any){

    return {
        type: Constants.SET_ERROR,
        payload: error
    }

}

export function hideError(){

    return {
        type: Constants.HIDE_ERROR
    }

}
