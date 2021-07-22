/* eslint-disable */
import { login, logout } from './login';

//DOM ELEMENTS
const loginForm = document.querySelector('.contact--login');
const logOutBtn = document.querySelector('.btn--logout');

// VALUES

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);
