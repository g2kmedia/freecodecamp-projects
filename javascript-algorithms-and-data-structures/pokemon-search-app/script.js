// Get HTML elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonHp = document.getElementById("hp");
const pokemonAttack = document.getElementById("attack");
const pokemonDefense = document.getElementById("defense");
const pokemonSpAttack = document.getElementById("special-attack");
const pokemonSpDefense = document.getElementById("special-defense");
const pokemonSpeed = document.getElementById("speed");
const pokemonTypes = document.getElementById("types");
const pokemonSprite = document.getElementById("pokemon-sprite");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonCard = document.getElementById("pokemon-card");

let pokemonData = [];

const fetchPokemonData = async () => {
    try {
        const res = await fetch(
            "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"
        );
        const data = await res.json();
        pokemonData = data.results.map((item) => {
            return {
                id: item.id.toString(),
                name: item.name
            };
        });

    } catch (err) {
        console.log(err);
    }
};

fetchPokemonData();

searchButton.addEventListener("click", () => {
    const userInput = searchInput.value.toLowerCase().replace(/\s/g, "-");

    getSearchedPokemonData(userInput);

    searchInput.value = "";
});

let searchedPokemon = {};

const getSearchedPokemonData = async (pokemonIdentifier) => {
    try {
        const res = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonIdentifier}`
        );
        const data = await res.json();

        searchedPokemon.name = data.name;
        searchedPokemon.id = data.id;
        searchedPokemon.weight = data.weight;
        searchedPokemon.height = data.height;

        searchedPokemon.types = data.types.map((item) => item.type.name);

        searchedPokemon.hp = data.stats.find((item) =>
            item.stat.name === "hp" ? item.base_stat : null
        )?.base_stat;

        searchedPokemon.attack = data.stats.find((item) =>
            item.stat.name === "attack" ? item.base_stat : null
        )?.base_stat;

        searchedPokemon.defense = data.stats.find((item) =>
            item.stat.name === "defense" ? item.base_stat : null
        )?.base_stat;

        searchedPokemon.specialAttack = data.stats.find((item) =>
            item.stat.name === "special-attack" ? item.base_stat : null
        )?.base_stat;

        searchedPokemon.specialDefense = data.stats.find((item) =>
            item.stat.name === "special-defense" ? item.base_stat : null
        )?.base_stat;

        searchedPokemon.speed = data.stats.find((item) =>
            item.stat.name === "speed" ? item.base_stat : null
        )?.base_stat;

        searchedPokemon.sprite = data.sprites.front_default;

        displayResults(searchedPokemon);
    } catch (err) {
        alert("Pokémon not found");
        console.log(`Pokémon not found: ${err}`);
    }
};

const displayResults = (searchedPokemon) => {
    pokemonName.innerHTML = searchedPokemon.name.toUpperCase();
    pokemonId.innerHTML = `#${searchedPokemon.id}`;
    pokemonHp.textContent = searchedPokemon.hp;
    pokemonAttack.textContent = searchedPokemon.attack;
    pokemonDefense.textContent = searchedPokemon.defense;
    pokemonSpAttack.textContent = searchedPokemon.specialAttack;
    pokemonSpDefense.textContent = searchedPokemon.specialDefense;
    pokemonSpeed.textContent = searchedPokemon.speed;
    pokemonWeight.innerHTML = `Weight: ${searchedPokemon.weight}`;
    pokemonHeight.innerHTML = `Height: ${searchedPokemon.height}`;

    if (searchedPokemon.types.length === 2) {
        pokemonTypes.innerHTML = `
    <span>${searchedPokemon.types[0].toUpperCase()}</span>
    <span>${searchedPokemon.types[1].toUpperCase()}</span>`;
    } else {
        pokemonTypes.innerHTML = `<span>${searchedPokemon.types[0].toUpperCase()}</span>`;
    }

    pokemonSprite.innerHTML = `
  <img id="sprite" src="${searchedPokemon.sprite}" 
  alt="${searchedPokemon.name.toUpperCase()} Sprite">`;

    // style the pokemon card based on the pokemon type
    if (searchedPokemon.types.length === 2) {
        pokemonCard.style.background = `linear-gradient(to right, var(--${searchedPokemon.types[0]}) 50%, var(--${searchedPokemon.types[1]}) 100%)`;
    } else {
        pokemonCard.style.background = `var(--${searchedPokemon.types[0]}`;
    }
};
