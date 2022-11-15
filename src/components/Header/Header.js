import logo from '../../images/logo.svg';
import { useLocation, useHistory } from 'react-router-dom';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const routePathsValues = Object.values(ROUTE_PATHS);
  const isLoginPage = location.pathname === ROUTE_PATHS.signIn ? true : false;
  const isRegisterPage = location.pathname === ROUTE_PATHS.signUp ? true : false;
  const logoClassName = (`header__logo ${(isLoginPage || isRegisterPage) ? 'header__logo_type_login-register' : ''}`);

  function handleLogoClick() {
    history.push(ROUTE_PATHS.main);
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