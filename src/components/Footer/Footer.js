import { useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '../../utils/RoutePaths';
import React from 'react';
import './Footer.css';

function Footer() {

  const location = useLocation();
  const isLoginPage = location.pathname === ROUTE_PATHS.signIn ? true : false;
  const isRegisterPage = location.pathname === ROUTE_PATHS.signUp ? true : false;
  const isProfilePage = location.pathname === ROUTE_PATHS.profile ? true : false;
  const isMainPage = location.pathname === ROUTE_PATHS.main ? true : false;
  const routePathsValues = Object.values(ROUTE_PATHS);
  const footerClassname = (`footer ${(location.pathname === ROUTE_PATHS.main) ? 'footer_type_main' : ''}`);

  return (
    <>
      {(routePathsValues.includes(location.pathname) && !isLoginPage && !isRegisterPage && !isProfilePage) &&
        <footer
          className={footerClassname}>
          <p
            className='footer__title'>
            Учебный проект Яндекс.Практикум х BeatFilm.
          </p>
          <ul
            className='footer__links-container'>
            <li
              className='footer__link-element'>
              <a
                rel='noreferrer'
                lang='ru'
                target='_blank'
                href='https://practicum.yandex.ru/'
                className='footer__link'>
                Яндекс.Практикум
              </a>
            </li>
            <li
              className='footer__link-element'>
              <a
                rel='noreferrer'
                lang='en'
                target='_blank'
                href='https://github.com/KunPitun'
                className='footer__link'>
                Github
              </a>
            </li>
            {!isMainPage &&
              <li
                className='footer__link-element'>
                <a
                  rel='noreferrer'
                  lang='en'
                  target='_blank'
                  href='https://www.facebook.com/'
                  className='footer__link'>
                  Facebook
                </a>
              </li>}
          </ul>
          <p
            className='footer__copyright'>
            &copy;2022
          </p>
        </footer>
      }
    </>
  );
}

export default Footer;