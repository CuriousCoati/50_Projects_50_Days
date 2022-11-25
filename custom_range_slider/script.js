const range = document.getElementById('range')
const label = range.nextElementSibling

range.addEventListener('input', () => {
  const value = +range.value
  label.innerHTML = value

  const rangeWidth = getComputedStyle(range).getPropertyValue('width')
  const labelWidth = getComputedStyle(label).getPropertyValue('width')

  const numRangeWidth = +rangeWidth.substring(0, rangeWidth.length -2)
  const numLabelWidth = +labelWidth.substring(0, labelWidth.length -2)

  const max = +range.max
  const min = -range.min

  const left = value * (numRangeWidth / max) - (numLabelWidth / 2) + scale(value, min, max, 10, -10)

  label.style.left = left + 'px'

})

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
