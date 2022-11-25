const resultsContainer = document.getElementById('results')
const filter = document.getElementById('filter')
const listItems = []

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
  const res = await fetch('https://randomuser.me/api?results=50')
  const { results } = await  res.json()

  resultsContainer.innerText = ''

  results.forEach(user => {
    const li = document.createElement('li');
    resultsContainer.appendChild(li)
    listItems.push(li);

    const img = document.createElement('img')
    img.src = user.picture.large
    img.alt = user.name.first
    li.appendChild(img)

    const userInfo = document.createElement('div')
    userInfo.classList.add('user-info')
    li.appendChild(userInfo)

    const h4 = document.createElement('h4')
    h4.innerText = user.name.first + ' ' + user.name.last
    userInfo.appendChild(h4)

    const p = document.createElement('p')
    p.innerText = user.location.city + ', ' + user.location.country
    userInfo.appendChild(p)
  })

}

function filterData(searchTerm) {
  listItems.forEach(item => {
    if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
      item.classList.remove('hide')
    } else {
      item.classList.add('hide')
    }
  })
}

getData()
