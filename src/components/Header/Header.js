import logo from '../../images/logo.svg';
import { useLocation, useHistory } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {
  const location = useLocation();
  const history = useHistory();
  const routePaths = Object.values(props.routePaths);
  const isLoginPage = location.pathname === props.routePaths.signIn ? true : false;
  const isRegisterPage = location.pathname === props.routePaths.signUp ? true : false;
  const logoClassName = (`header__logo ${(isLoginPage || isRegisterPage) &&
    'header__logo_type_login-register'}`);

  function handleLogoClick() {
    history.push(props.routePaths.main);
  }

  return (
    <>
      {routePaths.includes(location.pathname) &&
        <header className='header'>
          <img onClick={handleLogoClick} className={logoClassName} src={logo} alt='Логотип'></img>
          <Navigation routePaths={props.routePaths} />
          {isLoginPage && <p className='header__greeting'>Рады видеть!</p>}
          {isRegisterPage && <p className='header__greeting'>Добро пожаловать!</p>}
        </header>}
    </>
  );
}

export default Header;