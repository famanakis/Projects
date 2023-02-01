const closeButton = document.querySelector('.close-nav')
const nav = document.querySelector('.nav')
const openButton = document.querySelector('.open-nav')

openButton.addEventListener('click', ()=> {
    nav.classList.add('navigation-open')
})


closeButton.addEventListener('click', ()=> {
    nav.classList.remove('navigation-open')
})