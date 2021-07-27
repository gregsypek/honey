/* eslint-disable */
import { login, logout } from './login';
import { updateData } from './updateSettings';

//DOM ELEMENTS
const loginForm = document.querySelector('.contact--login');
const logOutBtn = document.querySelector('.btn--logout');
const userDataForm = document.querySelector('.form__account');

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

    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;

    updateData(name, email);
  });
