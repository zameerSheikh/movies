import React, { Fragment } from "react";
import {
  AppBar,
  Toolbar,
  FormControl,
  Typography,
  InputBase,
  Select,
  MenuItem,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useLocation } from "react-router-dom";

import { useMovieContext } from "../hooks/useMovieContext";
import { useSetMovieContext } from "../hooks/useSetMovieContext";
import { MOVIE_ACTION_TYPES } from "../movieReducer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: "pointer",
    flexGrow: 1,
  },
  home: {
    cursor: "pointer",
    marginRight: 20,
  },
  active: {
    cursor: 'auto',
    color: 'black',
    marginRight: 20,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: "inherit",
    borderRadius: theme.shape.borderRadius,
    minHeight: "1.3em",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    "& .MuiSelect-icon": {
      color: "white",
    },
    "& .MuiSelect-select": {
      color: "white",
      paddingLeft: 10,
      height: "1.4em",
    },
  },
}));

export default function SearchBar(props) {
  const movieState = useMovieContext();
  const dispatch = useSetMovieContext();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  // const searchRef = useRef(null);
  const searchMovie = (search) => {
    dispatch({
      type: MOVIE_ACTION_TYPES.SET_SEARCH,
      payload: {
        searchString: search,
      },
    });
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={location.pathname === '/' ? classes.active : classes.home}
            variant="h6"
            onClick={() => history.push("/")}
            noWrap
          >
            Home
          </Typography>
          <Typography
            className={location.pathname === '/favorites' ? classes.active : classes.title}
            variant="h6"
            onClick={() => history.push("/favorites")}
            noWrap
          >
            Favorites
          </Typography>
          {location.pathname === '/' ?
          <Fragment>
           <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={e => searchMovie(e.target.value)}
            />
          </div>
          <FormControl className={classes.formControl}>
            <Select
              id="movieType"
              value={movieState.type}
              onChange={(e) =>
                dispatch({
                  type: MOVIE_ACTION_TYPES.SET_TYPE,
                  payload: e.target.value,
                })
              }
            >
              <MenuItem value={"movie"}>Movie</MenuItem>
              <MenuItem value={"series"}>Series</MenuItem>
              <MenuItem value={"episode"}>Episode</MenuItem>
            </Select>
          </FormControl>
          </Fragment> : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
