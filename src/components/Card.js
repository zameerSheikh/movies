import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useHistory } from 'react-router-dom';

import { useSetMovieContext } from '../hooks/useSetMovieContext';
import { MOVIE_ACTION_TYPES } from "../movieReducer";

const useStyles = makeStyles(() => ({
  root: {
    width: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
    padding: 10,
  },
}));

export default function RecipeReviewCard({movie}) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useSetMovieContext();
  const moviesToSetInStorage = localStorage.movies || "[]";
  const parsedMovies = JSON.parse(moviesToSetInStorage);
  const [movies, setMovies] = useState(parsedMovies);
  const isMovieAdded = movie && movies.some(m => m.imdbID === movie.imdbID);
  const markFavorite = () => {
    let newMovies;
    if(isMovieAdded){
      newMovies = movies.filter(m => m.imdbID !== movie.imdbID);
    }else{
      newMovies = [...movies, movie]
      console.log('newMovies: ', newMovies);
    }
    localStorage.setItem("movies", JSON.stringify(newMovies));
    setMovies(newMovies);
  }

  const goToDetailsPage = () => {
      dispatch({
        type: MOVIE_ACTION_TYPES.SET_MOVIE,
        payload: {
          movie: movie,
        },
      });
      history.push(`/card/${movie.imdbID}`)
  }
  const renderCardContent = () => {
    if (!movie) {
      return null;
    }

    if (!movie?.Title) {
      return <p>Search for movies, series or episodes.</p>;
    }

    return (
      <Card className={classes.root} >
        <CardHeader title={movie.Title} subheader={movie.Released} />
        <CardMedia
          className={classes.media}
          image={movie.Poster}
          title="Paella dish"
          onClick={() => goToDetailsPage()}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={() => markFavorite()}>
            <FavoriteIcon color={isMovieAdded ? 'error' : 'disabled'}/>
          </IconButton>
        </CardActions>
      </Card>
    );
  };

  return (
    <Fragment>
      <div className={classes.container}>{renderCardContent()}</div>
    </Fragment>
  );
}
