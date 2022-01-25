import { types } from "./types";

const initialState = {
  category: '',
  user: null,
  favourite: [],
  profile : {}
};


export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CATEGORY:
      return { ...state, category: action.payload };

    case types.SAVE_USER:
      return { ...state, user: action.payload };
    case types.SAVE_FAV:
      return { ...state, favourite: action.payload }
    case types.LOGOUT:
      return { ...state, user: null }
    case types.ADDFAV:
      return { ...state, favourite : [...state.favourite, action.payload] }
      
      case types.USER : 
      return {...state, profile : action.payload}
    case types.REMOVE:
      const newFav = state.favourite.filter((item) => {
        return item.name !== action.payload;
      });
    
      return { ...state, favourite : [...newFav] }
    default:
      return state;
  }
};