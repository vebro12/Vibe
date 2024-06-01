import * as CommentApi from '../api/CommentRequest.js';

export const getComments = (postId) => async (dispatch) => {
  dispatch({ type: "COMMENTS_LOADING_START" });
  try {
    const { data } = await CommentApi.getComments(postId);
    dispatch({ type: "COMMENTS_LOADING_SUCCESS", data: data, postId: postId });
  } catch (error) {
    console.error(error);
    dispatch({ type: "COMMENTS_LOADING_FAIL" });
  }
};
