window.addEventListener("DOMContentLoaded", e =>{
    // const signUpButton = document.querySelector('.sign-up');
    // const signUpForm = document.querySelector('.sign-up-form');
    // const signInForm = document.querySelector('.form-container');
    // const closeForm = document.querySelector('.fa-xmark')

    // const out = e => {
    //     if (e.target == document.body) {
    //         signUpForm.style.display = 'none';
    //         signInForm.style.display = 'flex';
    //     };
    // };

    // window.addEventListener('click', out);

    // signUpButton.addEventListener('click', e => {
    //     signUpForm.style.display = 'flex';
    //     signInForm.style.display = 'none';
    // });

    // closeForm.addEventListener('click', e => {
    //     signUpForm.style.display = 'none';
    //     signInForm.style.display = 'flex';
    // });
    const clickContainer = document.querySelector('.click-container');
    const dropdown = document.querySelector('.dropdown')
    const arrow = document.querySelector('.fa-angle-down')
    clickContainer.addEventListener('click', async (e) => {
        if(dropdown.style.display !== 'flex'){
            dropdown.style.display = 'flex';
            arrow.style.transform = 'rotate(360deg)'
            arrow.style.transition = 'all .25s'
        }
        else {
            dropdown.style.display = 'none';
            arrow.style.transform = 'rotate(180deg)'
        }
    })
})
