const APIURL = 'https://api.github.com/users/'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username)
    createUserCard(data)
    getRepos(username)
  } catch(error) {
    if (error.response.status === 404) {
      createErrorCard('No profile with this username')
    } else {
      console.log(error)
    }
  }
}

function createUserCard(data) {
  main.innerHTML = `<div class="card">
        <div>
          <img src="${data.avatar_url}" alt="${data.name}" class="avatar">
        </div>
        <div class="user-info">
          <h2>${data.name}</h2>
          <p>${data.bio}</p>

          <ul>
            <li>${data.followers} <strong>Followers</strong></li>
            <li>${data.following} <strong>Following</strong></li>
            <li>${data.public_repos} <strong>Repos</strong></li>
          </ul>

          <div id="repos">
          </div>
        </div>
      </div>`
}

function createErrorCard(message) {
  main.innerHTML = `<div class="card">
        <h1>${message}</h1>
      </div>`
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created')
    addReposToCard(data)
  } catch(error) {
    createErrorCard('Problem fetching repos')
  }
}

function addReposToCard(repos) {
  const reposEl = document.getElementById('repos')

  repos.slice(0, 10).forEach(repo => {
    const repoLink = document.createElement('a')
    repoLink.classList.add('repo')
    repoLink.href = repo.html_url
    repoLink.target = '_blank'
    repoLink.innerText = repo.name
    reposEl.appendChild(repoLink)
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const user = search.value

  if (user) {
    getUser(user)
    search.value = ''
  }
})