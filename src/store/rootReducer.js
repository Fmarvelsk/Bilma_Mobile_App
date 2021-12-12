import { types } from "./types";

const initialState = {
  category : '',
  user: null
};


export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.GET_CATEGORY :
        return { ...state, category : action.payload};
        
      case types.SAVE_USER :
        return { ...state, user : action.payload};
      default:
        return state;
    }
  };