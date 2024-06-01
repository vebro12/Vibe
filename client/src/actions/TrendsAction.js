import * as TrendsApi from '../api/TrendsRequest.js';

export const getTrends = (userId) => async (dispatch) => {
  try {
    const { data } = await TrendsApi.getTrends(userId);
      dispatch({
        type: 'GET_TRENDS_SUCCESS',
        payload: data,
      });
  } catch (error) {
    console.error(error);
    dispatch({ type:  'GET_TRENDS_FAIL' });
  }
};

export const createTrend = (trendData) => async (dispatch) => {
  try {
    const { data } = await TrendsApi.createTrend(trendData);
    dispatch({
      type: 'ADD_TREND_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ADD_TREND_FAIL',
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
