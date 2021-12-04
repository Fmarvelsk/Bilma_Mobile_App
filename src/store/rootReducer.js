import { types } from "./types";

const initialState = {
  category : ''
};


export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_CATEGORY :
        return { ...state, category : action.payload};
      default:
        return state;
    }
  };