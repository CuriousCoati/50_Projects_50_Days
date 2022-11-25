const screens = document.querySelectorAll('.screen')
const insectBtns = document.querySelectorAll('.choose-insect-btn')
const startButton = document.getElementById('start-btn')
const gameContainer = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const messageEl = document.getElementById('message')

let seconds = 0
let score = 0
let selectedInsect = {}

startButton.addEventListener('click', () => screens[0].classList.add('up'))

insectBtns.forEach(insectBtn => {
  insectBtn.addEventListener('click', () => {
    const img = insectBtn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')
    selectedInsect = { src, alt}
    screens[1].classList.add('up')
    setTimeout(createInsect, 1000)
    startGame()
  })
})

function createInsect() {
  const insect = document.createElement('div')
  insect.classList.add('insect')
  const { x, y } = getRandomLocation()
  insect.style.top = `${y}px`
  insect.style.left = `${x}px`
  insect.innerHTML = `<img src="${selectedInsect.src}" alt="${selectedInsect.alt}" style="transform: rotate(${Math.random() *360}deg)"/>`

  insect.addEventListener('click', catchInsect)

  gameContainer.appendChild(insect)
}

function startGame() {
  setInterval(updateTime, 1000)
}

function updateTime() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m
  s = s< 10 ? `0${s}` : s
  time.innerHTML = `Time: ${m}:${s}`
  seconds++
}

function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y }
}

function addInsects() {
  setTimeout(createInsect, 1000)
  setTimeout(createInsect, 1500)
}

function catchInsect() {
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove, 2000)
  addInsects()
}

function increaseScore() {
  score++
  if (score == 20) {
    message.classList.add('visible')
  }
  scoreEl.innerHTML = `Score: ${score}`
}

