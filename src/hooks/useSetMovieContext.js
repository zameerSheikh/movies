import { useContext } from "react";

import { setMovieContext } from "../movieContextProvider";

export function useSetMovieContext() {
  return useContext(setMovieContext);
}
