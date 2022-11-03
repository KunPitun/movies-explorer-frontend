import './AboutProject.css'

function AboutProject() {
  return (
    <section id='main-about-project' className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className='about-project__container'>
        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="about-project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className='about-project__container'>
        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="about-project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <table className="about-project__table">
        <thead>
          <tr>
            <th className="about-project__table-column about-project__table-column_type_main">1 неделя</th>
            <th className="about-project__table-column about-project__table-column_type_main">4 недели</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="about-project__table-column about-project__table-column_type_secondary">Back-end</th>
            <th className="about-project__table-column about-project__table-column_type_secondary">Front-end</th>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

export default AboutProject;