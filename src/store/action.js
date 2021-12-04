import { types } from "./types";
import { store } from ".";

const { dispatch } = store

export const getSelectedCategory = (data) => {
    return dispatch({ type: types.GET_CATEGORY, payload: data })
}