import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import * as auth from '../../auth.js';
import * as api from '../../utils/Api';
import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css'
import './App.css';
import Profile from '../Profile/Profile';

function App() {
  const routePaths = {
    main: '/',
    movies: '/movies',
    savedMovies: '/saved-movies',
    profile: '/profile',
    signIn: '/signin',
    signUp: '/signup'
  }
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({
    name: '', email: '', _id: '',
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState({ name: '', link: '', _id: '' });
  const [movies, setMovies] = React.useState([]);
  const [isSubmitBtnActive, setIsSubmitBtnActive] = React.useState(true);
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isEmailMatchesPassword, setIsEmailMatchesPassword] = React.useState(false);

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getMainData();
    }
    handleTokenCheck();
  }, []);

  function getMainData() {
    api.getUserData()
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    api.getMovies()
      .then((movies) => {
        setMovies(movies.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push(routePaths.main);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleMovieDelete() {
    setIsSubmitBtnActive(false);
    api.deleteMovie(selectedMovie._id)
      .then(() => {
        setMovies((state) => state.filter((c) => c._id !== selectedMovie._id));
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeleteClick(movie) {
    setSelectedMovie(movie);
  }


  function handleUpdateUser(name, email) {
    setIsSubmitBtnActive(false);
    api.giveUserInfo(name, email)
      .then((user) => {
        setCurrentUser(user.data);
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  ) {
    setIsSubmitBtnActive(false);
    api.giveMoviesInfo(
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      nameRU,
      nameEN,
    )
      .then((newMovie) => {
        setMovies([newMovie.data, ...movies]);
      })
      .finally(() => {
        setIsSubmitBtnActive(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          getMainData();
          setLoggedIn(true);
          localStorage.setItem('currentUserName', data.name);
          history.push(routePaths.main);
        }
      })
      .catch(err => console.log(err));
  }

  function handleLogOut() {
    setLoggedIn(false);
    history.push(routePaths.signIn);
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUserName');
  }

  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        history.push(routePaths.signIn);
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err);
        setIsRegistered(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={loggedIn} routePaths={routePaths} />
        <main>
          <Switch>
            <Route exact path={routePaths.signIn}>
              <Login routePaths={routePaths} />
            </Route>
            <Route exact path={routePaths.signUp}>
              <Register routePaths={routePaths} />
            </Route>
            <Route exact path={routePaths.profile}>
              <Profile onLogOut={handleLogOut} />
            </Route>
            <Route exact path={routePaths.main}>
              <Main />
            </Route>
            <Route exact path={routePaths.movies}>
              <Movies />
            </Route>
            <Route exact path={routePaths.savedMovies}>
              <SavedMovies />
            </Route>
            <Route path='*'><PageNotFound />
            </Route>
          </Switch>
        </main>
        <Footer routePaths={routePaths}></Footer>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);