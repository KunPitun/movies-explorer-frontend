import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';

function Main() {
  return (
    <section
    className='main'>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
    </section>
  );
}

export default Main;