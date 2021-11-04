/* eslint-disable*/
// LAZY LOADING IMAGES

const images = document.querySelectorAll('.lazyload');

function handleIntersection(entries) {
  entries.map(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.classList.add('loaded');
      observer.unobserve(entry.target);
    } else return;
  });
}

const observer = new IntersectionObserver(handleIntersection);

images.forEach(image => observer.observe(image));
