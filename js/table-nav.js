const tableTabs = document.querySelectorAll('.table-nav__link');
const tableTabsContainer = document.querySelector('.table-nav__list');
const tableTabContent = document.querySelectorAll('.table');

tableTabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.table-nav__link');

  if (!clicked) return;

  //Remove active classes
  tableTabs.forEach(t => t.classList.remove('active'));
  tableTabContent.forEach(c => c.classList.remove('table--active'));

  //Acivate  tab navigation
  clicked.classList.add('active');

  //Activate chosen table
  document
    .querySelector(`.table--${clicked.dataset.nav}`)
    .classList.add('table--active');
});
