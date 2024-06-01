const initialState = {
  commentsByPostId: {}, // Store comments indexed by post IDs
  loading: false,
  error: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "COMMENTS_LOADING_START":
      return { ...state, loading: true, error: false };
    case "COMMENTS_LOADING_SUCCESS":
      return {
        ...state,
        commentsByPostId: {
          ...state.commentsByPostId,
          [action.postId]: action.data, // Add comments under their respective post ID
        },
        loading: false,
        error: false,
      };
    case "COMMENTS_LOADING_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default commentReducer;
