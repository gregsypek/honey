/* eslint-disable */
import { login } from './login';

//DOM ELEMENTS
const loginForm = document.querySelector('.contact--login');

// VALUES

if (loginForm)
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
