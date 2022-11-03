import { useLocation } from 'react-router-dom';
import React from 'react';
import './Footer.css';

function Footer(props) {

  const location = useLocation();
  const isLoginPage = location.pathname === props.routePaths.signIn ? true : false;
  const isRegisterPage = location.pathname === props.routePaths.signUp ? true : false;
  const isProfilePage = location.pathname === props.routePaths.profile ? true : false;
  const isMainPage = location.pathname === props.routePaths.main ? true : false;
  const routePaths = Object.values(props.routePaths);

  return (
    <>
      {(routePaths.includes(location.pathname) && !isLoginPage &&
        !isRegisterPage && !isProfilePage) && <>
          <footer className={`footer ${(location.pathname === props.routePaths.main) && 'footer_type_main'}`}>
            <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <ul className='footer__links-container'>
              <li className='footer__link-element'>
                <a rel='noreferrer' lang='ru' target='_blank' href='https://practicum.yandex.ru/' className='footer__link'>Яндекс.Практикум</a>
              </li>
              <li className='footer__link-element'>
                <a rel='noreferrer' lang='en' target='_blank' href='https://github.com/KunPitun' className='footer__link'>Github</a>
              </li>
              {!isMainPage && <li className='footer__link-element'>
                <a rel='noreferrer' lang='en' target='_blank' href='https://www.facebook.com/' className='footer__link'>Facebook</a>
              </li>}
            </ul>
            <p className='footer__copyright'>&copy;2022</p>
          </footer>
        </>}
    </>
  );
}

export default Footer;