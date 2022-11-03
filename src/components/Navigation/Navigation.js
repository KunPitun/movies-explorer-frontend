import './Navigation.css';
import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';

function Navigation(props) {
  const location = useLocation();
  const isMainPage = location.pathname === props.routePaths.main ? true : false;
  const isLoginPage = location.pathname === props.routePaths.signIn ? true : false;
  const isRegisterPage = location.pathname === props.routePaths.signUp ? true : false;
  const [isMobileMenueOpen, setIsMobileMenueOpen] = React.useState(false);

  function handleOpenMenueButton() {
    setIsMobileMenueOpen(true);
  }

  function handleCloseMenueButton() {
    setIsMobileMenueOpen(false);
  }

  return (
    <nav className='navigation'>
      {isMainPage &&
        <ul className='navigation__links-container'>
          <li className='navigation__link-element'>
            <Link className='navigation__link navigation__link_type_register' to={props.routePaths.signUp}>Регистрация</Link>
          </li>
          <li className='navigation__link-element navigation__link-element_type_login'>
            <Link className='navigation__link navigation__link_type_login' to={props.routePaths.signIn}>Войти</Link>
          </li>
        </ul>}
      {(!isMainPage && !isLoginPage && !isRegisterPage) && <>
        <button onClick={handleOpenMenueButton} className='navigation__btn navigation__btn_type_open'></button>
        <ul className='navigation__links-container navigation__links-container_type_big-size'>
          <li className='navigation__link-element navigation__link-element_type_big-size'>
            <Link className='navigation__link' to={props.routePaths.movies}>Фильмы</Link>
          </li>
          <li className='navigation__link-element navigation__link-element_type_big-size'>
            <Link className='navigation__link navigation__link_type_saved' to={props.routePaths.savedMovies}>Сохранённые фильмы</Link>
          </li>
          <li className='navigation__link-element navigation__link-element_type_big-size'>
            <Link className='navigation__link navigation__link_type_profile' to={props.routePaths.profile}>Аккаунт</Link>
          </li>
        </ul>
      </>}
      {isMobileMenueOpen &&
        <div className='navigation__mobile-menue'>
          <button onClick={handleCloseMenueButton}
            className="navigation__btn navigation__btn_type_close"></button>
          <ul className='navigation__links-container navigation__links-container_type_mobile'>
            <li className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <NavLink exact activeClassName='navigation__link_active' className='navigation__link navigation__link_type_nav'
                to={props.routePaths.main} onClick={handleCloseMenueButton}>Главная</NavLink>
            </li>
            <li className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <NavLink exact activeClassName='navigation__link_active' className='navigation__link navigation__link_type_nav'
                to={props.routePaths.movies} onClick={handleCloseMenueButton}>Фильмы</NavLink>
            </li>
            <li className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <NavLink exact activeClassName='navigation__link_active' className='navigation__link navigation__link_type_nav'
                to={props.routePaths.savedMovies} onClick={handleCloseMenueButton}>Сохранённые фильмы</NavLink>
            </li>
            <li className='navigation__link-element navigation__link-element_type_mobile-menue'>
              <Link className='navigation__link navigation__link_type_profile'
                to={props.routePaths.profile} onClick={handleCloseMenueButton}>Аккаунт</Link>
            </li>
          </ul>
        </div>}
    </nav>
  );
}

export default Navigation;