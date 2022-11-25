const imageContainer = document.querySelector('.image-container')
const unsplashURL = 'https://source.unsplash.com/random/'
const rows = 10

for (let i = 0; i < rows * 3; i++) {
  createImage()
}

function createImage() {
  const img = document.createElement('img')
  img.src = `${unsplashURL}${getRandomSize()}`
  imageContainer.appendChild(img)
}

function getRandomSize() {
  return `${getRandomNr()}x${getRandomNr()}`
}

function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300
}