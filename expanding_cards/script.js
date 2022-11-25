const panels = document.querySelectorAll('.panel')

panels.forEach((panel) => {
  panel.addEventListener('click', () => {
    removeActiveClass();
    panel.classList.add('active')
  })
})

function removeActiveClass() {
  let activePanel = document.querySelector('.panel.active');
  activePanel.classList.remove('active');
}