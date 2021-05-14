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

////////////////////////////////////////////
//sticky navigation starting in hero section
// const navFirst = document.querySelector('.navigation__row--first');
// const nav = document.querySelector('.navigation__row--second');
// const navHeight = nav.getBoundingClientRect().height;

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };

// const navFirstObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   // rootMargin: `-${navHeight}px`,
// });
// navFirstObserver.observe(navFirst);

//sticky navigation starting in info section
const header = document.querySelector('.hero');
const nav = document.querySelector('.navigation__row--second');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////////////////////////
//REVEAL SECTIONS

const allSections = document.querySelectorAll('.hide');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// REVEAL TEXT
// const allText = document.querySelectorAll('.animate');
// console.log(allText);

// const revealText = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove('text--hidden');
//   observer.unobserve(entry.target);
// };

// const textObserver = new IntersectionObserver(revealText, {
//   root: null,
//   threshold: 0.1,
// });

// allText.forEach(function (text) {
//   textObserver.observe(text);
//   text.classList.add('text--hidden');
// });
// ROTATE HEX
const allHex = document.querySelectorAll('.rotate');

const rotateHex = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('hex--hidden');
  observer.unobserve(entry.target);
};

const hexObserver = new IntersectionObserver(rotateHex, {
  root: null,
  threshold: 0.1,
});

allHex.forEach(function (hex) {
  hexObserver.observe(hex);
  hex.classList.add('hex--hidden');
});
