const password = document.getElementById('password')
const background = document.getElementById('background')

const preferredPasswordLength = 12
const numberOfChecks = 3
const maxScorePerCheck = 100 / numberOfChecks

password.addEventListener('keyup', evaluatePasswordStrength)

function evaluatePasswordStrength() {
  let passwordScore = 0;
  passwordScore += calculatePasswordLengthScore();
  passwordScore += checkForUppercase()
  passwordScore += checkForLowercase()
  const blur = scale(passwordScore, 0, 100, 20, 0)
  background.style.filter = `blur(${blur}px)`
}

function calculatePasswordLengthScore() {
  const passwordLength = password.value.length
  const percentage = Math.min(100, passwordLength * 100 / preferredPasswordLength)
  return scale(percentage, 0, 100, 0, maxScorePerCheck)
}

function checkForUppercase() {
  if (password.value.toLowerCase() != password.value) {
    return maxScorePerCheck
  } else {
    return 0
  }
}

function checkForLowercase() {
  if (password.value.toUpperCase() != password.value) {
    return maxScorePerCheck
  } else {
    return 0
  }
}

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
