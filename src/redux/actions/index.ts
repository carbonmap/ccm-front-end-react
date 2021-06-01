export const screenSm = () => {
    return {
        type: 'MOBILE'
    }
}
export const screenLg = () => {
    return {
        type: 'DESKTOP'
    }
}

export const endLoading = () => {
    return {
        type: 'LOADED'
    }
}

export const menuOpen = () => {
    return {
        type: 'OPEN'
    }
}
export const menuClosed = () => {
    return {
        type: 'CLOSED'
    }
}

export const selectLocation = (location: object) => {
    return {
        type: 'SET_LOCATION',
        payload: location
    }
}