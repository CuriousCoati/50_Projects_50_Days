const ratings = document.querySelectorAll('.rating')
const panel = document.getElementById('panel')
let selectedRating = 'Satisfied'

panel.addEventListener('click', (e) => {
  if (e.target.classList.contains('rating')) {
    changeActive(e.target)
  } else if (e.target.parentNode.classList.contains('rating')) {
    changeActive(e.target.parentNode)
  } else if (e.target.id === 'send') {
    sendFeedback()
  }
})

function changeActive(rating) {
  removeActive()
  rating.classList.add('active')
  selectedRating = rating.children[1].innerHTML
}

function removeActive() {
  for(let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove('active')
  }
}

function sendFeedback() {
  panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <br>
    <strong>Feedback: ${selectedRating}</strong>
    <p>We'll use your feedback to improve our customer support</p>
  `
}