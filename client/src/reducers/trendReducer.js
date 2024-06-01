const initialState = {
  trends: [],
  error: null,
};

export const trendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TRENDS_SUCCESS":
      return {
        ...state,
        trends: action.payload,
      };
    case "GET_TRENDS_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    case "ADD_TREND_SUCCESS":
      return {
        ...state,
        trends: [action.payload, ...state.trends],
      };
    case "ADD_TREND_FAIL":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default trendsReducer;
