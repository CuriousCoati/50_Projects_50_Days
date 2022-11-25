const symbols = '!@#$%^&*(){}[]=<>/,.'
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const digitsEl = document.getElementById('digits')
const symbolsEl = document.getElementById('symbols')
const clipboardEl = document.getElementById('clipboard')
const generateEl = document.getElementById('generate')

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  digit: getRandomDigit,
  symbol: getRandomSymbol
}

generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasDigits = digitsEl.checked
  const hasSymbols = symbolsEl.checked

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasDigits, hasSymbols, length)
})

clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText

  if (!password) {
    return
  } else {
    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
  }
})

function generatePassword(lower, upper, digit, symbol, length) {
  let generatedPassword = ''
  const typesArr = [{lower}, {upper}, {digit}, {symbol}].filter(item => Object.values(item)[0])

  if (typesArr.length === 0) {
    return ''
  }

  for(let i = 0; i < length; i++) {
    const funcName = Object.keys(typesArr[getRandomNumber(0, typesArr.length - 1)])[0]
    generatedPassword += randomFunc[funcName]()
  }

  return generatedPassword
}

function getRandomNumber(minNumber, maxNumber) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
}

function getRandomLower() {
  return String.fromCharCode(getRandomNumber(97, 122))
}

function getRandomUpper() {
  return String.fromCharCode(getRandomNumber(65, 90))
}

function getRandomDigit() {
  return String.fromCharCode(getRandomNumber(48, 57))
}

function getRandomSymbol() {
  return symbols[getRandomNumber(0, symbols.length - 1)]
}