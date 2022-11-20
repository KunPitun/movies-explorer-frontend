import './InfoTooltip.css';

function InfoTooltip(p) {

  function handleClose() {
    p.setIsInfoTooltipOpen({ isOpen: false, message: p.isInfoTooltipOpen.message });
  }

  return (
    <section
      className='info-tooltip'>
      <div
        className='info-tooltip__container'>
        <button
          onClick={handleClose}
          className='info-tooltip__close-btn' />
        <h2
          className='info-tooltip__title'>
          {p.isInfoTooltipOpen.message}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;