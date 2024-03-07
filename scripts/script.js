let sprites
let isShiny = false
let isFront = true

//Function to grab pokemon information by pokedex ID, querySelector input by ID and append innerText to endpoint url
async function getPokemonInfo(pokemonNumber) {
  let pokeName = document.querySelector('.pokeName')
  let pokePic = document.querySelector('.pokePic')
  let pokeNum = document.querySelector('.pokeNum')
  let pokeType1 = document.querySelector('.pokeType1')
  let pokeType2 = document.querySelector('.pokeType2')
  let pokeWeight = document.querySelector('.pokeWeight')
  let pokeHeight = document.querySelector('.pokeHeight')
  if (pokemonNumber.length > 3 && pokemonNumber > 905) {
    console.log('Pokemon ID does not exist')
  } else {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
    response = await response.json()
    pokeName.innerHTML = response.name.toUpperCase([0])
    let convertedWeight = response.weight / 10
    let convertedHeight = response.height / 10
    pokeWeight.innerHTML = `Weight: ${convertedWeight} kg`
    pokeHeight.innerHTML = `Height: ${convertedHeight} m`
    sprites = response.sprites
    pokePic.setAttribute('src', `${sprites.front_default}`)
    pokeNum.innerHTML = response.id
    console.log(response)
    if (response.types.length > 1) {

      let type1 = response.types[0].type.name
      let type2 = response.types[1].type.name
      pokeType1.setAttribute('src', `./scripts/assets/${type1}.png`)
      pokeType2.setAttribute('src', `./scripts/assets/${type2}.png`)

    } else {
      let type1 = response.types[0].type.name
      pokeType2.setAttribute('src', '')
      console.log(type1)
      pokeType1.setAttribute('src', `./scripts/assets/${type1}.png`)
      console.log(response.id)
    }
  }
}

async function getNextPokemon(nextPokeNum) {
  let pokemonID = parseInt(document.querySelector('.pokeNum').innerHTML)
  pokemonID += nextPokeNum
  if (pokemonID < 1 || pokemonID > 905) {
    console.log('Pokemon ID does not exist.')
  } else {
    getPokemonInfo(pokemonID)
    getPokemonDesc(pokemonID)
  }
}
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

async function getCard() {
  let cardRowDiv = document.querySelector('.cardRow')
  if (cardRowDiv.childElementCount >= 6) {
    alert("You can only add 6 pokemon to your team!");
  }
  else {
    let pokemon = document.querySelector('.pokeName')

    let cards = document.createElement('img')
    let response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemon.innerHTML}`)
    response = await response.json()
    let randomNum = getRandomArbitrary(0, response.data.length)
    console.log(Math.floor(randomNum))
    cards.setAttribute('src', response.data[Math.floor(randomNum)].images.large)
    cards.setAttribute('id', 'card1')
    console.log(response.data[0].images.large)
    cardRowDiv.append(cards)
    console.log(response.data)
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function clearDeck() {

  let cardRowDiv = document.querySelector('.cardRow')
  removeAllChildNodes(cardRowDiv)
}



function addNumberToInput(buttonValue) {

  let input = document.querySelector('#input')
  if (input.innerText.length > 2 || input.innerText > 905) {
    console.log('ID would be out of range')
  } else {
    input.innerText += buttonValue

    // input.innerText+=getPokemonDesc()
  }
}

async function getPokemonDesc(nextPokemonNum) {
  let pokemonID = document.querySelector('#input')
  if (nextPokemonNum > 3 && nextPokemonNum > 905) {
    console.log('Pokemon ID does not exist')
  } else {
  console.log(nextPokemonNum)

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nextPokemonNum}`)
    response = await response.json()
    console.log(response.flavor_text_entries)
    for (let desc of response.flavor_text_entries) {
      if (desc.language.name == 'en') {
        console.log(desc.flavor_text);
        setTimeout(() => {
          pokemonID.innerHTML = desc.flavor_text
        }, 2000)
        pokemonID.innerHTML = 'Loading...'
        break;


      }
      //    console.log(desc.language.name)
    }
  }
}

function clearInput() {
  let pokemonID = document.querySelector('#input')
  pokemonID.innerHTML = ''
  isShiny = false
  isFront = true
}
function setGender(gen) {
  gender = gen;
  if (gender === 'female') {
    document.getElementById("male-icon").classList.remove("gender-active");
    document.getElementById("female-icon").classList.add("gender-active");
  } else {
    document.getElementById("male-icon").classList.add("gender-active");
    document.getElementById("female-icon").classList.remove("gender-active");
  }
  setURLimage();
}

function clickLeftRight() {
  frontView = !frontView;
  setURLimage();
}

function clickUp() {
  if (numPokemon === 1) {
    setNumPokemon(lastPokemon)
  } else {
    setNumPokemon(numPokemon - 1)
  }
  setURLimage();
  setNameDescriptionTypes();
}

function clickBottom() {
  if (numPokemon === lastPokemon) {
    setNumPokemon(1);
  } else {
    setNumPokemon(numPokemon + 1);
  }
  setURLimage();
  setNameDescriptionTypes();
}

function clickNormalColor() {
  shiny = false;
  setURLimage();
  document.getElementById("light-button-red").classList.remove("off");
  document.getElementById("light-button-red").classList.add("on");
  document.getElementById("light-button-blue").classList.add("off");
  document.getElementById("light-button-blue").classList.remove("on");
}

function clickShinyColor() {
  shiny = true;
  setURLimage();
  document.getElementById("light-button-red").classList.remove("on");
  document.getElementById("light-button-red").classList.add("off");
  document.getElementById("light-button-blue").classList.add("on");
  document.getElementById("light-button-blue").classList.remove("off");
}

function toggleSprite(button) {
  let pokePic = document.querySelector('.pokePic')
  console.log(sprites)
  switch(button) {
    case 1:
      if (!isShiny && isFront) {
        pokePic.setAttribute('src', `${sprites.front_shiny}`)
      } else if (!isShiny && !isFront) {
        pokePic.setAttribute('src', `${sprites.back_shiny}`)
      } else if (isShiny && isFront) {
        pokePic.setAttribute('src', `${sprites.front_default}`)
      } else if (isShiny && !isFront){
        pokePic.setAttribute('src', `${sprites.back_default}`)
      }
      isShiny = !isShiny
      break
    case 2:
      if (!isShiny && isFront) {
        pokePic.setAttribute('src', `${sprites.back_default}`)
      } else if (!isShiny && !isFront) {
        pokePic.setAttribute('src', `${sprites.front_default}`)
      } else if (isShiny && isFront) {
        pokePic.setAttribute('src', `${sprites.back_shiny}`)
      } else if (isShiny && !isFront) {
        pokePic.setAttribute('src', `${sprites.front_shiny}`)
      }
      isFront = !isFront
      break
  }
}
