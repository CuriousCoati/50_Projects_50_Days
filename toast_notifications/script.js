const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const messages = [
    'Message One',
    'Message Two',
    'Message Three',
    'Message Four',
];

const types = [
    'error',
    'warning',
    'info',
    'success',
];

button.addEventListener('click', () => createNotification());

function createNotification() {
  const toast = document.createElement('div');

  toast.classList.add('toast');
  toast.classList.add(getRandomType());
  toast.innerText = getRandomMessage();
  toasts.appendChild(toast);

  setTimeout(() => {
      toast.remove();
  }, 5000)
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomType() {
    return types[Math.floor(Math.random() * types.length)];
}