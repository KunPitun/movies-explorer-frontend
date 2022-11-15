import './AboutMe.css'
import Portfolio from '../Portfolio/Portfolio';
import authorAvatar from '../../images/author-avatar.jpg';

function AboutMe() {
  return (
    <section
      id='main-student'
      className='about-me'>
      <h2
        className='about-me__title'>
        Студент
      </h2>
      <div
        className='about-me__container'>
        <img
          src={authorAvatar}
          className='about-me__avatar'
          alt='Аватар автора проекта' />
        <h3
          className='about-me__subtitle'>
          Николай
        </h3>
        <p
          className='about-me__pre-description'>
          Фронтенд-разработчик, 22 года
        </p>
        <p
          className='about-me__description'>
          Я родился и живу в Москве, планирую закончить МГТУ Станкин по направлению ИСИТ. У меня есть пять эублефаров и черепаха.
          Я люблю слушать музыку, рисовать, а ещё увлекаюсь велоспортом. Недавно начал кодить. После того, как прошёл курс по
          веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <ul
          className='about-me__links-container'>
          <li
            className='about-me__link-item'>
            <a
              target="_blank"
              rel='noreferrer'
              lang='en'
              href='https://www.facebook.com'
              className='about-me__link'>
              Facebook
            </a>
          </li>
          <li
            className='about-me__link-item'>
            <a
              target="_blank"
              rel='noreferrer'
              lang='en'
              href='https://github.com/KunPitun'
              className='about-me__link'>
              Github
            </a>
          </li>
        </ul>
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;