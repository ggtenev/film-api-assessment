import * as TYPES from "./types";
import {
  fetchFavorites,
  removeFromFavorites,
  addToFavorites,
} from "../../db/db";

export const getAllFavs = () => async (dispatch: any) => {
  try {
    const dbResults: any = await fetchFavorites();
    console.log("ACTIONS GETALL", dbResults);
    dispatch({
      type: TYPES.GET_FAVORITE_FILMS,
      payload: dbResults?.rows?._array,
    });
  } catch (ex: any) {
    dispatch({
      type: TYPES.GET_FAVORITE_ERROR,
      payload: ex?.message,
    });
  }
};

export const addToFavorite = (data: any) => {
  return async (dispatch: any) => {
    try {
      const dbresult = await addToFavorites(
        data.title,
        data.posterUri,
        data.year,
        data.type,
        data.id
      );
      dispatch({
        type: TYPES.ADD_TO_FAVORITES,
        payload: { ...data, id: Number(data.id.slice(2)) },
      });
    } catch (ex: any) {
      dispatch({
        type: TYPES.ADD_TO_FAVORITES_ERROR,
        payload: ex?.message,
      });
    }
  };
};
export const removeFromFavoritesHandler =
  (id: any) => async (dispatch: any) => {
    try {
      const dbresult = await removeFromFavorites(id);
      dispatch({
        type: TYPES.DELETE_FROM_FAVORITES,
        payload: id,
      });
    } catch (ex: any) {
      dispatch({
        type: TYPES.DELETE_FROM_FAVORITES_ERROR,
        payload: ex?.message,
      });
    }
  };
