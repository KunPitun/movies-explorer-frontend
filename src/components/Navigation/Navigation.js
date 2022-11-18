import './Navigation.css';
import React from 'react';
import { ROUTE_PATH } from '../../utils/Constants';
import { Link, useLocation, NavLink } from 'react-router-dom';

function Navigation() {
  const location = useLocation();
  const isLoginPage = location.pathname === ROUTE_PATH.signIn ? true : false;
  const isRegisterPage = location.pathname === ROUTE_PATH.signUp ? true : false;
  const [isMobileMenueOpen, setIsMobileMenueOpen] = React.useState(false);
  const isLoggedIn = localStorage.getItem('loggedIn') ? JSON.parse(localStorage.getItem('loggedIn')) : false;

  function handleOpenMenueButton() {
    setIsMobileMenueOpen(true);
  }

  function handleCloseMenueButton() {
    setIsMobileMenueOpen(false);
  }

  return (
    <nav
      className='navigation'>
      {(!isLoggedIn && !isRegisterPage && !isLoginPage) &&
        <ul
          className='navigation__links-container'>
          <li
            className='navigation__link-element'>
            <Link
              className='navigation__link navigation__link_type_register'
              to={ROUTE_PATH.signUp}>
              Регистрация
            </Link>
          </li>
          <li
            className='navigation__link-element navigation__link-element_type_login'>
            <Link
              className='navigation__link navigation__link_type_login'
              to={ROUTE_PATH.signIn}>
              Войти
            </Link>
          </li>
        </ul>}
      {(!isLoginPage && !isRegisterPage && isLoggedIn) &&
        <>
          <button
            onClick={handleOpenMenueButton}
            className='navigation__btn navigation__btn_type_open' />
          <ul
            className='navigation__links-container navigation__links-container_type_big-size'>
            <li
              className='navigation__link-element navigation__link-element_type_big-size'>
              <Link
                className='navigation__link' to={ROUTE_PATH.movies}>
                Фильмы
              </Link>
            </li>
            <li
              className='navigation__link-element navigation__link-element_type_big-size'>
              <Link
                className='navigation__link navigation__link_type_saved'
                to={ROUTE_PATH.savedMovies}>
                Сохранённые фильмы
              </Link>
            </li>
            <li
              className='navigation__link-element navigation__link-element_type_big-size'>
              <Link
                className='navigation__link navigation__link_type_profile'
                to={ROUTE_PATH.profile}>
                Аккаунт
              </Link>
            </li>
          </ul>
        </>}
      {isMobileMenueOpen &&
        <div
          className='navigation__mobile-menue'>
          <button
            onClick={handleCloseMenueButton}
            className="navigation__btn navigation__btn_type_close" />
          <ul
            className='navigation__links-container navigation__links-container_type_mobile'>
            <li
              className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <NavLink
                exact
                activeClassName='navigation__link_active'
                className='navigation__link navigation__link_type_nav'
                to={ROUTE_PATH.main}
                onClick={handleCloseMenueButton}>
                Главная
              </NavLink>
            </li>
            <li
              className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <NavLink
                exact
                activeClassName='navigation__link_active'
                className='navigation__link navigation__link_type_nav'
                to={ROUTE_PATH.movies}
                onClick={handleCloseMenueButton}>
                Фильмы
              </NavLink>
            </li>
            <li
              className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <NavLink
                exact
                activeClassName='navigation__link_active'
                className='navigation__link navigation__link_type_nav'
                to={ROUTE_PATH.savedMovies}
                onClick={handleCloseMenueButton}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li
              className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <Link
                className='navigation__link navigation__link_type_profile'
                to={ROUTE_PATH.profile}
                onClick={handleCloseMenueButton}>
                Аккаунт
              </Link>
            </li>
          </ul>
        </div>}
    </nav>
  );
}

export default Navigation;