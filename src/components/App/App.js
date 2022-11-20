import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { ROUTE_PATH, MESSAGE } from '../../utils/Constants';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as auth from '../../auth.js';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css'
import './App.css';
import Profile from '../Profile/Profile';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({
    email: '', name: '', _id: ''
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [findedSavedMovies, setFindedSavedMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [findedAllMovies, setFindedAllMovies] = React.useState([]);
  const [isSavedMoviesSearchError, setIsSavedMoviesSearchError] = React.useState(false);
  const [isAllMoviesSearchError, setIsAllMoviesSearchError] = React.useState(false);
  const [isSavedMoviesApiError, setIsSavedMoviesApiError] = React.useState(false);
  const [isAllMoviesApiError, setIsAllMoviesApiError] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState({ isOpen: false, message: '' });
  const [isPreloaderVisible, setIsPreloaderVisible] = React.useState(false);
  const [isFormBlocked, setIsFormBlocked] = React.useState(false);

  React.useEffect(() => {
    handleTokenCheck()
      .then(() => {
        getMainData();
      })
      .catch((err) => {
        if (JSON.parse(localStorage.getItem('loggedIn'))) {
          console.log(err.message);
        }
      });
  }, []);

  function getMainData() {
    const isAllFilmsInput = localStorage.getItem('allFilmsInputs') ? true : false;
    mainApi.getUserData()
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        setCurrentUser(user.data);
      })
      .catch((err) => {
        console.log(err.message);
        setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.getUserDataError });
      });
    mainApi.getUserMovies()
      .then((movies) => {
        setSavedMovies(movies.data.reverse());
        setFindedSavedMovies(movies.data.reverse());
      })
      .catch((err) => {
        setIsSavedMoviesApiError(true);
        console.log(err.message);
      });
    if (isAllFilmsInput) {
      handleSearchMovies(JSON.parse(localStorage.getItem('allFilmsInputs')), false);
    }
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            localStorage.setItem('loggedIn', JSON.stringify(true));
          }
        })
        .catch((err) => {
          handleLogOut();
          console.log(err.message);
        });
    } else {
      localStorage.setItem('loggedIn', JSON.stringify(false));
      return Promise.reject({ message: MESSAGE.jwtErrorMessage })
    }
  }

  function handleRegister(name, email, password) {
    setIsFormBlocked(true);
    auth.register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .finally(() => {
        setIsFormBlocked(false);
      })
      .catch((err) => {
        console.log(err.message);
        if (err.status === 409) {
          setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.registerUserIsAlreadyRegisteredError });
        } else {
          setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.registerError });
        }
      });
  }

  function handleLogin(email, password) {
    setIsFormBlocked(true);
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('loggedIn', JSON.stringify(true));
          getMainData();
          history.push(ROUTE_PATH.movies);
        }
      })
      .finally(() => {
        setIsFormBlocked(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.loginError });
      });
  }

  function handleLogOut() {
    localStorage.clear();
    setFindedAllMovies([]);
    history.push(ROUTE_PATH.main);
  }

  function handleUpdateUser(name, email) {
    setIsFormBlocked(true);
    mainApi.giveUserInfo(name, email)
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user.data));
        setCurrentUser(user.data);
      })
      .finally(() => {
        setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.profileUpdate });
        setIsFormBlocked(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.profileUpdateError });
      });
  }

  function handleAddMovie(movieCard) {
    delete movieCard.coincidences;
    mainApi.giveUserMovieInfo(movieCard)
      .then((newMovie) => {
        setSavedMovies([newMovie.data, ...savedMovies]);
        setFindedSavedMovies([newMovie.data, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err.message);
        setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.addMovieError });
      });
  }

  function handleMovieDelete(movieCard) {
    const cardToDelete = savedMovies.find(movie => movie.movieId === movieCard.movieId);
    mainApi.deleteUserMovie(cardToDelete._id)
      .then(() => {
        setSavedMovies((state) => state.filter((c) => c._id !== cardToDelete._id));
        setFindedSavedMovies((state) => state.filter((c) => c._id !== cardToDelete._id));
      })
      .catch((err) => {
        console.log(err.message);
        setIsInfoTooltipOpen({ isOpen: true, message: MESSAGE.deleteMovieError });
      });
  }

  function handleSearchMovies(filmInput, isSaved) {
    const keyRegexes = filmInput.split(' ').map((word) => {
      const wordWithoutBackSlash = word.split('\\').join('');
      return new RegExp(wordWithoutBackSlash, 'i');
    });
    let moviesFindedByKeyRegexes = [];

    function filtByRegexes(movie) {
      let coincidences = 0;
      keyRegexes.forEach((regex) => {
        if (regex.test(movie.nameRU)) {
          coincidences += 1;
        }
      });
      movie.coincidences = coincidences;
      if (coincidences > 0) {
        return movie;
      }
      return null;
    }

    function compareCoincedences(a, b) {
      if (a.coincidences > b.coincidences) return -1;
      if (a.coincidences === b.coincidences) return 0;
      if (a.coincidences < b.coincidences) return 1;
    }

    function isError(findedMovies) {
      if (findedMovies.length === 0) {
        if (isSaved) {
          setIsSavedMoviesSearchError(true);
          setFindedSavedMovies([]);
        } else {
          setIsAllMoviesSearchError(true);
          setFindedAllMovies([]);
        }
        return true;
      }
      return false;
    }

    function handleSetFindedMovies(moviesList) {
      moviesFindedByKeyRegexes = moviesList.filter((movie) => filtByRegexes(movie));
      if (!isError(moviesFindedByKeyRegexes)) {
        if (isSaved) {
          setFindedSavedMovies(moviesFindedByKeyRegexes.sort(compareCoincedences));
        } else {
          setFindedAllMovies(moviesFindedByKeyRegexes.sort(compareCoincedences));
        }
      }
    }

    if (isSaved) {
      setIsSavedMoviesSearchError(false);
      handleSetFindedMovies(savedMovies);
    } else {
      setIsAllMoviesSearchError(false);
      localStorage.setItem('allFilmsInput', filmInput);
      if (allMovies.length === 0) {
        setIsPreloaderVisible(true);
        setIsAllMoviesApiError(false);
        moviesApi.getAllMovies()
          .then((movies) => {
            setAllMovies(movies);
            handleSetFindedMovies(movies);
          })
          .finally(() => {
            setIsPreloaderVisible(false);
          })
          .catch((err) => {
            setIsAllMoviesApiError(true);
            console.log(err.message);
          });
      } else {
        handleSetFindedMovies(allMovies);
      }
    }
  }

  return (
    <CurrentUserContext.Provider
      value={currentUser}>
      <div
        className="page">
        <Header />
        <main>
          <Switch>
            <Route
              exact
              path={ROUTE_PATH.signIn}>
              <Login
                isFormBlocked={isFormBlocked}
                onLogin={handleLogin} />
            </Route>
            <Route
              exact
              path={ROUTE_PATH.signUp}>
              <Register
                isFormBlocked={isFormBlocked}
                isInfoTooltipOpen={setIsInfoTooltipOpen}
                onRegister={handleRegister} />
            </Route>
            <Route
              exact
              path={ROUTE_PATH.main}>
              <Main />
            </Route>
            <ProtectedRoute
              exact
              path={ROUTE_PATH.profile}
              onUpdateUser={handleUpdateUser}
              onLogOut={handleLogOut}
              isFormBlocked={isFormBlocked}
              component={Profile} />
            <ProtectedRoute
              exact
              path={ROUTE_PATH.movies}
              component={Movies}
              onSearch={handleSearchMovies}
              moviesCardsList={findedAllMovies}
              isSearchError={isAllMoviesSearchError}
              onMovieDelete={handleMovieDelete}
              isPreloaderVisible={isPreloaderVisible}
              onMovieSave={handleAddMovie}
              savedMoviesCardsList={savedMovies}
              isApiError={isAllMoviesApiError} />
            <ProtectedRoute
              exact
              path={ROUTE_PATH.savedMovies}
              component={SavedMovies}
              onSearch={handleSearchMovies}
              savedMoviesCardsList={savedMovies}
              findedSavedMoviesCardsList={findedSavedMovies}
              isSearchError={isSavedMoviesSearchError}
              onMovieDelete={handleMovieDelete}
              isPreloaderVisible={isPreloaderVisible}
              isApiError={isSavedMoviesApiError} />
            <Route
              path='*'>
              <PageNotFound />
            </Route>
          </Switch>
          {isInfoTooltipOpen.isOpen &&
            <InfoTooltip
              isInfoTooltipOpen={isInfoTooltipOpen}
              setIsInfoTooltipOpen={setIsInfoTooltipOpen} />}
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);