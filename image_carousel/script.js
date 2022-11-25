const imgs = document.getElementById('imgs')
const prev = document.getElementById('left')
const next = document.getElementById('right')
const imgCount = document.querySelectorAll('#imgs img').length
let position = 0

prev.addEventListener('click', moveBackward)
next.addEventListener('click', moveForward)

let interval
resetInterval()

function moveForward() {
  position++
  if (position === imgCount) {
    position = 0
  }
  changeImage()
}

function moveBackward() {
  position--
  if (position < 0) {
    position = imgCount - 1
  }
  changeImage()
}

function changeImage() {
  imgs.style.transform = `translateX(-${position * 500}px)`;
  resetInterval()
}

function resetInterval() {
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(moveForward,3000)
}