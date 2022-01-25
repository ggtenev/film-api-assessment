import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { favoritesReducer } from "./favorites/reducer";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
