import React, { useReducer } from "react";

import movieReducer from "./movieReducer";

const initialState = {
  movie: null,
  searchString: "",
  type: "movie",
  loading: false,
  error: "",
};

export const movieContext = React.createContext();
export const setMovieContext = React.createContext();
export default function ({ children }) {
  const [movieState, dispatch] = useReducer(movieReducer, initialState);

  return (
    <movieContext.Provider value={movieState}>
      <setMovieContext.Provider value={dispatch}>
        {children}
      </setMovieContext.Provider>
    </movieContext.Provider>
  );
}
