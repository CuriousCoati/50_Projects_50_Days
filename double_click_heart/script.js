const loveMe = document.querySelector('.love-me')
const times =document.getElementById('times')

let heartCount = 0
let clickTime = 0

loveMe.addEventListener('click', (e) => {
  let now = new Date().getTime()
  if (clickTime === 0) {
    clickTime = now
  } else {
    if (now - clickTime < 800) {
      createHeart(e)
      clickTime = 0
    } else {
      clickTime = now
    }
  }
})

const createHeart = (e) => {
  const heart = document.createElement('i')
  heart.classList.add('fas')
  heart.classList.add('fa-heart')

  const x = e.clientX
  const y = e.clientY

  heart.style.left = `${x - loveMe.offsetLeft}px`
  heart.style.top = `${y - loveMe.offsetTop}px`

  loveMe.appendChild(heart)

  times.innerText = (++heartCount).toString()

  setTimeout(() => heart.remove(), 1000)
}