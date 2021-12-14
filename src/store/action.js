import { types } from "./types";
import { store } from ".";


const { dispatch } = store

export const getSelectedCategory = (data) => {
    return dispatch({ type: types.GET_CATEGORY, payload: data })
}

export const saveUserId = (data) => {
    return dispatch({ type: types.SAVE_USER, payload: data })
}

export const saveUserFavourite = (data) => {
    return dispatch({ type: types.SAVE_FAV, payload: data })
}
export const logoutProfile = (data) => {
    return dispatch({ type: types.LOGOUT})
}

export const addFavorite = (data) => {
    return dispatch({type : types.ADDFAV, payload : data})
}
export const removeFavourite = (data) => {
    return dispatch({type : types.REMOVE, payload : data})
}

export const saveUser = (data) => {
    return dispatch({ type: types.USER, payload: data })

}