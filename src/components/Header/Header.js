import logo from '../../images/logo.svg';
import { useLocation, useHistory } from 'react-router-dom';
import { ROUTE_PATH } from '../../utils/Constants';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const routePathsValues = Object.values(ROUTE_PATH);
  const isLoginPage = location.pathname === ROUTE_PATH.signIn ? true : false;
  const isRegisterPage = location.pathname === ROUTE_PATH.signUp ? true : false;
  const logoClassName = (`header__logo ${(isLoginPage || isRegisterPage) ? 'header__logo_type_login-register' : ''}`);

  function handleLogoClick() {
    history.push(ROUTE_PATH.main);
  }

  return (
    <>
      {routePathsValues.includes(location.pathname) &&
        <header
          className='header'>
          <img
            onClick={handleLogoClick}
            className={logoClassName}
            src={logo}
            alt='Логотип' />
          <Navigation />
          {isLoginPage &&
            <p
              className='header__greeting'>
              Рады видеть!
            </p>}
          {isRegisterPage &&
            <p
              className='header__greeting'>
              Добро пожаловать!
            </p>}
        </header>}
    </>
  );
}

export default Header;