import { combineReducers, createStore } from "redux";
import { currReducer } from "./currenciesReducer/currencies.reducer";

const rootReducer = combineReducers({
  currReducer
});

export const store = createStore(rootReducer);
