//SLIDER-TABLE

const slider = function () {
  const opinions = document.querySelectorAll('.opinion');

  const btnRight = document.querySelector('.table__btn--right');
  const btnLeft = document.querySelector('.table__btn--left');

  const activateOpinion = function (opinion) {
    opinions.forEach(o => o.classList.remove('opinion--active'));

    document
      .querySelector(`.opinion--${opinion}`)
      .classList.add('opinion--active');
  };

  const goToOpinion = function (opinion) {
    opinions.forEach(
      (o, i) => (o.style.transform = `translateX(${100 * (i - opinion)}%)`)
    );
  };

  let curOpinion = 0;
  const maxOpinion = opinions.length;
  console.log(maxOpinion);

  const nextOpinion = function () {
    if (curOpinion === maxOpinion - 1) {
      curOpinion = 0;
    } else curOpinion++;
    goToOpinion(curOpinion);
    activateOpinion(curOpinion);
  };

  const prevOpinion = function () {
    if (curOpinion === 0) {
      curOpinion = maxOpinion - 1;
    } else curOpinion--;
    goToOpinion(curOpinion);
    activateOpinion(curOpinion);
  };

  const init = function () {
    goToOpinion(0);
    activateOpinion(0);
  };
  init();

  btnRight.addEventListener('click', nextOpinion);
  btnLeft.addEventListener('click', prevOpinion);
};

slider();
