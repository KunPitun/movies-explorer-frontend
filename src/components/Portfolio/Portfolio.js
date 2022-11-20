import './Portfolio.css';

function Portfolio() {
  return (
    <section
      className="portfolio">
      <h3
        className="portfolio__title">
        Портфолио
      </h3>
      <ul
        className="portfolio__links-container">
        <li
          className="portfolio__link-element">
          <a
            lang='ru'
            target="_blank"
            rel='noreferrer'
            href="https://kunpitun.github.io/how-to-learn/"
            className="portfolio__link">
            Статичный сайт
          </a>
          <a
            lang='ru'
            target="_blank"
            rel='noreferrer'
            href="https://kunpitun.github.io/how-to-learn/"
            className="portfolio__arrow-link">
            ↗
          </a>
        </li>
        <li
          className="portfolio__link-element">
          <a
            lang='ru'
            target="_blank"
            rel='noreferrer'
            href="https://kunpitun.github.io/russian-travel/"
            className="portfolio__link">
            Адаптивный сайт
          </a>
          <a
            lang='ru'
            target="_blank"
            rel='noreferrer'
            href="https://kunpitun.github.io/russian-travel/"
            className="portfolio__arrow-link">
            ↗
          </a>
        </li>
        <li
          className="portfolio__link-element">
          <a
            lang='ru'
            target="_blank"
            rel='noreferrer'
            href="https://kunpitun.mesto.nomoredomains.icu/sign-up"
            className="portfolio__link">
            Одностраничное приложение
          </a>
          <a
            lang='ru'
            target="_blank"
            rel='noreferrer'
            href="https://kunpitun.mesto.nomoredomains.icu/sign-up"
            className="portfolio__arrow-link">
            ↗
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;