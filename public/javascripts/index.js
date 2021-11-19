window.addEventListener("DOMContentLoaded", e =>{
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
