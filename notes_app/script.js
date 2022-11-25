const addBtn = document.getElementById('add')

addBtn.addEventListener('click', () => addNewNote())
loadFromLocalStorage()

function addNewNote() {
  createNote()
  updateLocalStorage()
}

function createNote(text = '') {
  const note = document.createElement('div')
  note.classList.add('note')
  document.body.appendChild(note)

  const tools = document.createElement('div')
  tools.classList.add('tools')
  note.appendChild(tools)

  const editButton = document.createElement('button')
  editButton.classList.add('edit')
  tools.appendChild(editButton)

  const editIcon = document.createElement('i')
  editIcon.classList.add('fas')
  editIcon.classList.add('fa-edit')
  editButton.appendChild(editIcon)

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete')
  tools.appendChild(deleteButton)

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fas')
  deleteIcon.classList.add('fa-trash-alt')
  deleteButton.appendChild(deleteIcon)

  const main = document.createElement('div')
  main.classList.add('main')
  note.appendChild(main)

  const textarea = document.createElement('textarea')
  note.appendChild(textarea)

  textarea.value = text
  main.innerHTML = marked(text)

  if (text) {
    textarea.classList.add('hidden')
  } else {
    main.classList.add('hidden')
  }

  deleteButton.addEventListener('click', () => deleteNote(note))
  editButton.addEventListener('click', () => editNote(note))
  textarea.addEventListener('input', () => updateLocalStorage())

}

function deleteNote(note) {
  note.remove()
  updateLocalStorage()
}

function editNote(note) {
  const main = note.querySelector('.main')
  const textarea = note.querySelector('textarea')

  main.classList.toggle('hidden')
  textarea.classList.toggle('hidden')

  if (textarea.classList.contains('hidden')) {
    main.innerHTML = marked(textarea.value)
  }

  updateLocalStorage()
}

function updateLocalStorage() {
  const notesText = document.querySelectorAll('textarea')
  const notes = []

  notesText.forEach(note => notes.push(note.value))

  localStorage.setItem('notes', JSON.stringify(notes))
}

function loadFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem('notes'))

  if (notes) {
    notes.forEach(note => createNote(note))
  }
}