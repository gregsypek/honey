/* eslint-disable */
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
// import { handleIntersection } from './gallery';

//DOM ELEMENTS
const loginForm = document.querySelector('.contact--login');
const logOutBtn = document.querySelector('.btn--logout');
const userDataForm = document.querySelector('.form__account');
const userPasswordForm = document.querySelector('.form__password');

const images = document.querySelectorAll('.lazyload');
// VALUES

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', document.getElementById('userName').value);
    form.append('email', document.getElementById('userEmail').value);
    form.append('photo', document.getElementById('userPhoto').files[0]);
    console.log(form);

    updateSettings(form, 'data');
  });

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent =
      'Aktualizuje...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'Zapisz hasło';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (images) {
  const handleIntersection = entries => {
    console.log('jestem');
    entries.map(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      } else return;
    });
  };
  const observer = new IntersectionObserver(handleIntersection);

  images.forEach(image => observer.observe(image));
}
