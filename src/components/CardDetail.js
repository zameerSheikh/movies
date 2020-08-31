import React, { Fragment } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import SearchBar from './SearchBar';
import Card from './Card';
import { useMovieContext } from '../hooks/useMovieContext';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
    },
    details: {
        padding: 10,
    }
}));

const CardDetail = () => {
    const classes = useStyles();
    const movieState = useMovieContext();
    const { movie } = movieState;
    return (
        <Fragment>
            <SearchBar />
            <div className={classes.container}>
             <Card movie={movie} />
             <div className={classes.details}>
                 <Typography>Actors: {movie.Actors}</Typography>
                 <Typography>Genre: {movie.Genre}</Typography>
                 <Typography>Language: {movie.Language}</Typography>
                 <Typography>Rating: {movie.imdbRating}</Typography>
                 <Typography>Runtime: {movie.Runtime}</Typography>
             </div>
            </div>
        </Fragment>
    )
};

export default CardDetail;