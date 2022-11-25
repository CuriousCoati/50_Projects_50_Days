const navElements = document.querySelectorAll('nav ul li')
const contents = document.querySelectorAll('.content')
let active = 0

navElements.forEach((navElement, idx) => {
  navElement.addEventListener('click', () => navigate(idx))
})

function navigate(idx) {
  navElements[active].classList.remove('active')
  navElements[idx].classList.add('active')
  contents[active].classList.remove('show')
  contents[idx].classList.add('show')
  active = idx
}
