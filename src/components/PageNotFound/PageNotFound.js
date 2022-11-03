import { Link } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound () {

  return (
    <section className="not-found">
      <span className="not-found__error-code">404</span>
      <h3 className="not-found__title">Страница не надена</h3>
      <Link to='/' className="not-found__link">Назад</Link>
    </section>
  )
}

export default PageNotFound;