const elements = {
  pokemonID: document.getElementById('pokemon-id'),
  pokemonName: document.getElementById('pokemon-name'),
  spriteContainer: document.getElementById('sprite-container'),
  types: document.getElementById('types'),
  height: document.getElementById('height'),
  weight: document.getElementById('weight'),
  hp: document.getElementById('hp'),
  attack: document.getElementById('attack'),
  defense: document.getElementById('defense'),
  specialAttack: document.getElementById('special-attack'),
  specialDefense: document.getElementById('special-defense'),
  speed: document.getElementById('speed'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
};

const API_URL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';

const fetchData = async () => {
  const pokemonNameOrId = elements.searchInput.value.trim().toLowerCase();
  if (!pokemonNameOrId) return alert('Please enter a Pokémon name or ID.');

  try {
    const response = await fetch(`${API_URL}${pokemonNameOrId}`);
    if (!response.ok) throw new Error('Pokémon not found');

    const data = await response.json();
    updateDisplay(data);
  } catch (err) {
    resetDisplay();
    alert(err.message);
    console.error(`Error: ${err.message}`);
  }
};

const updateDisplay = (data) => {
  elements.pokemonName.textContent = data.name.toUpperCase();
  elements.pokemonID.textContent = `#${data.id}`;
  elements.weight.textContent = `Weight: ${data.weight}`;
  elements.height.textContent = `Height: ${data.height}`;

  elements.spriteContainer.innerHTML = `
    <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} sprite">
  `;

  const stats = {
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    specialAttack: data.stats[3].base_stat,
    specialDefense: data.stats[4].base_stat,
    speed: data.stats[5].base_stat,
  };

  Object.entries(stats).forEach(([key, value]) => {
    elements[key].textContent = value;
  });

  // Affichage des types avec adaptation de la couleur
  elements.types.innerHTML = '';
  data.types.forEach((obj) => {
    const typeSpan = document.createElement('span');
    typeSpan.className = `type ${obj.type.name}`;
    typeSpan.textContent = obj.type.name;
    elements.types.appendChild(typeSpan);
  });
};

const resetDisplay = () => {
  Object.values(elements).forEach((el) => {
    if (el.tagName !== 'FORM' && el.tagName !== 'INPUT') el.textContent = '';
  });
  elements.spriteContainer.innerHTML = '';
  elements.types.innerHTML = '';
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchData();
});
