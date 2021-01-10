//this code changed recommendations by clicking into dot
const dotsContainer = document.querySelector('.think_over__dots');
const dots = document.querySelectorAll('.think_over__dot');
const dotsContent = document.querySelectorAll('.think_over__recommend');

dotsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.think_over__dot');
  if (!clicked) return;

  // Remove active classes
  dots.forEach(dot => dot.classList.remove('dot--active'));
  dotsContent.forEach(content => content.classList.remove('recommend--active'));

  //Active recommendatioon
  clicked.classList.add('dot--active');

  //Active content area
  document
    .querySelector(`.recommend--${clicked.dataset.tab}`)
    .classList.add('recommend--active');
});
