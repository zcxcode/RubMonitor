import { createStore } from "redux";

export const defaultState = {
  currencies: [],
  filterCurrencies: [],
  filterInput: "",
  history: []
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "READ_CURRENCIES":
      return state.currencies;
    case "ADD_CURRENCIES":
      return {...state, currencies: action.content};
    case "ADD_HISTORY":
      return {...state, history: action.content}
    case "FILTER_CURRENCIES":
      return {...state, filterCurrencies: action.content}
    case "FILTER_INPUT":
      return {...state, filterInput: action.content};
    default:
      return state
  }
};

export const store = createStore(reducer);