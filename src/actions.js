export const ADD_PROFILE = 'ADD_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const TOGGLE_SITE = 'TOGGLE_SITE';

export const SET_CURRENT_PROFILE = 'CHANGE_PROFILE';
export const SET_CURRENT_SITE = 'CHANGE_SITE';

export const SET_DEFAULT_STATE = 'SET_DEFAULT_STATE';
export const SET_EXTERNAL_PROMPT = 'SET_EXTERNAL_PROMPT';

export const OPEN_SETTINGS = 'OPEN_SETTINGS';

export function openSettings() {
    return {type: OPEN_SETTINGS};
};

export function setCurrentProfile(id) {
    return {type: SET_CURRENT_PROFILE, id: id};
};

export function setCurrentSite(id) {
    return {type: SET_CURRENT_SITE, id: id};
};

export function toggleSite(id) {
    return {type: TOGGLE_SITE, id: id};
};
