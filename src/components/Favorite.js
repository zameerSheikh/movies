import React, { Fragment } from "react";
import { CircularProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SearchBar from "./SearchBar";
import Card from "./Card";
import { useMovieContext } from '../hooks/useMovieContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: 300,
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function Favorite(props) {
  const classes = useStyles();
  const movieState = useMovieContext();
  const moviesToMap = JSON.parse(localStorage.movies);
  if(moviesToMap.length === 0){
    return <Fragment>
            <SearchBar />
            <div className={classes.container}>
              <Typography>No Favorites yet!</Typography>
            </div>
            </Fragment>
  }
  return (
    <Fragment>
      <SearchBar />
      <div className={classes.container}>
        {movieState.loading ? <CircularProgress /> : 
          moviesToMap.map((movie) => <Card key={movie.imdbID} movie={movie} />)
        }
      </div>
    </Fragment>
  );
}
