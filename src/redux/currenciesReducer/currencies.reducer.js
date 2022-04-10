const defaultState = {
  currencies: [],
  history: [],
  filterInput: "",
  filterCurrencies: []
};

export const currReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CURRENCIES":
      return { ...state, currencies: action.content };
    case "ADD_HISTORY":
      return { ...state, history: action.content };
    case "FILTER_CURRENCIES":
      return { ...state, filterCurrencies: action.content };
    case "FILTER_INPUT":
      return { ...state, filterInput: action.content };
    default:
      return state;
  }
};
