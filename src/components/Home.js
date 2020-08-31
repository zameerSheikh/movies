import React, { Fragment } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

import Card from "./Card";
import SearchBar from "./SearchBar";
import { useMovieContext } from "../hooks/useMovieContext";

const useStyles = makeStyles({
  container: {
    display: "flex",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Home(props) {
  const classes = useStyles();
  const movieState = useMovieContext();
  return (
    <Fragment>
      <SearchBar />
      <div className={classes.container}>
        {movieState.loading ? <CircularProgress /> : <Card movie={movieState.movie}/>}
      </div>
    </Fragment>
  );
}
