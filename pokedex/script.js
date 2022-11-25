const pokeContainer = document.getElementById('poke-container')
const pokemon_count = 151
const colors = {
  fire: '#ff6666',
  grass: '#00cc44',
  electric: '#ffff4d',
  water: '#4d94ff',
  ice: '#99ebff',
  ground: '#ffb84d',
  rock: '#4d4d4d',
  fairy: '#ffccff',
  ghost: '#ccb3ff',
  poison: '#a64dff',
  bug: '#666633',
  dragon: '#97b3e6',
  psychic: '#ffffb3',
  flying: '#80b3ff',
  fighting: '#994d00',
  normal: '#e6ffe6',
  steel: '#cccccc'
}

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    const pokemonData = await getPokemon(i)
    createPokemonCard(pokemonData)
  }
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  return await res.json()
}

const createPokemonCard = (pokemonData) => {
  const pokemonEl = createElement('div', 'pokemon', pokeContainer)
  const imgContainer = createElement('div', 'img-container', pokemonEl)
  createImage(pokemonData.id, imgContainer)
  const infoEl = createElement('div', 'info', pokemonEl)
  createElement('span', 'number', infoEl,"#" + pokemonData.id.toString().padStart(3, '0'))
  createElement('h3', 'name', infoEl, pokemonData.name.capitalize())
  const typesEl = createElement('small', 'types', infoEl)
  createElement('small', undefined, typesEl, "Types:")

  let colorStrings = []
  pokemonData.types.forEach((type) => {
    colorStrings.push(colors[type.type.name])
    createElement('small', undefined, typesEl, type.type.name)
  })

  if (pokemonData.types.length === 1) {
    pokemonEl.style.background = colorStrings[0]
  } else {
    pokemonEl.style.backgroundImage = `linear-gradient(to right, ${colorStrings.join(', ')})`
  }
}

const createElement = (tagName, cssClass, parent, innerText) => {
  const element = document.createElement(tagName)
  if (cssClass) {
    element.classList.add(cssClass)
  }
  if (innerText) {
    element.innerText = innerText
  }
  parent.appendChild(element)
  return element
}

const createImage = (pokeId, parent) => {
  const imgEl = document.createElement("img")
  imgEl.src = `https://pokeres.bastionbot.org/images/pokemon/${pokeId}.png`
  parent.appendChild(imgEl)
}

Object.defineProperty(String.prototype, 'capitalize', {
  value: function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});

fetchPokemons()