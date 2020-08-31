import { produce } from "immer";

export const MOVIE_ACTION_TYPES = {
  SET_MOVIE: "set_movie",
  SET_SEARCH: "set_search",
  SET_LOADING: "set_loading",
  SET_TYPE: "set_type",
  SET_ERROR: "set_error",
};

export default function movieReducer(state, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case MOVIE_ACTION_TYPES.SET_MOVIE:
        draft.movie = action.payload.movie;
        break;
      case MOVIE_ACTION_TYPES.SET_SEARCH:
        draft.searchString = action.payload.searchString;
        break;
      case MOVIE_ACTION_TYPES.SET_TYPE:
        draft.type = action.payload.type;
        break;
      case MOVIE_ACTION_TYPES.SET_LOADING:
        draft.loading = action.payload.loading;
        break;
      case MOVIE_ACTION_TYPES.SET_ERROR:
        draft.error = action.payload.error;
        break;
      default:
        break;
    }
  });
}
