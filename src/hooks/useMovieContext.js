import { useContext } from "react";

import { movieContext } from "../movieContextProvider";

export function useMovieContext() {
  return useContext(movieContext);
}
