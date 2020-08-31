import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { from } from "rxjs";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./Home";
import Favorite from "./Favorite";
import CardDetail from "./CardDetail";
import { useMovieContext } from "../hooks/useMovieContext";
import { useSetMovieContext } from "../hooks/useSetMovieContext";
import { MOVIE_ACTION_TYPES } from "../movieReducer";

export default function App() {
  console.log('process', process.env);
  const movieState = useMovieContext();
  const dispatch = useSetMovieContext();
  const { searchString, type } = movieState;

  useEffect(() => {
    const updateLoadingStatus = (status) => {
      dispatch({
        type: MOVIE_ACTION_TYPES.SET_LOADING,
        payload: {
          loading: status,
        },
      });
    };

    updateLoadingStatus(true);
    const subscription = from(
      axios.get(
        `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&type=${type}&t=${searchString}`
      )
    ).subscribe({
      next(response) {
        dispatch({
          type: MOVIE_ACTION_TYPES.SET_MOVIE,
          payload: {
            movie: response.data,
          },
        });
        updateLoadingStatus(false);
      },
      error() {
        updateLoadingStatus(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [searchString, type, dispatch]);
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route
            exact
            path="/favorites"
            render={(props) => <Favorite {...props} />}
          />
          <Route path="/card/:id" render={(props) => <CardDetail {...props} />} />
        </Switch>
      </Router>
    </Fragment>
  );
}
