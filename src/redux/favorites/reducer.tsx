import * as TYPES from "./types";

let initialState = {
  favorites: [] as any[],
  error: null as any,
};

export const favoritesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.GET_FAVORITE_FILMS:
      return {
        ...state,
        favorites: payload,
      };

    case TYPES.GET_FAVORITE_ERROR:
      return {
        ...state,
        favorites: [],
        error: payload,
      };

    case TYPES.ADD_TO_FAVORITES:
      let tempAdd = [...state.favorites];
      tempAdd.push(payload);
      return {
        ...state,
        favorites: tempAdd,
      };
    case TYPES.ADD_TO_FAVORITES_ERROR:
      return {
        ...state,
        error: payload,
      };
    case TYPES.DELETE_FROM_FAVORITES:
      const primaryKey = Number(payload.slice(2));
      let tempDelete: object[] = state.favorites.filter(
        (el) => el.id !== primaryKey
      );
      return {
        ...state,
        favorites: tempDelete,
      };
    case TYPES.DELETE_FROM_FAVORITES_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
