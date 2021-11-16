window.addEventListener("DOMContentLoaded", e =>{
    const signUpButton = document.querySelector('.sign-up');
    const signUpForm = document.querySelector('.sign-up-form');
    const signInForm = document.querySelector('.form-container');
    signUpButton.addEventListener('click', e => {
        signUpForm.style.display = 'flex';
        signInForm.style.display = 'none';
    });
})
