import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Cards from "./components/Cards.jsx";
import "./App.css";

function App() {
  const [dataset, setDataset] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  // TODO: score and game over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); // TODO: local storage
  const [gameOver, setGameOver] = useState(false);

  const NUM_CARDS = 6;

  useEffect(() => {
    const pokemonData = [];
    const fetchPromises = [];
    for (let i = 1; i <= 20; i++) {
      const fetchPromise = fetch(
        `https://pokeapi.co/api/v2/pokemon/${Math.floor(
          150 * Math.random() + 1
        )}`
      )
        .then((response) => response.json())
        .then((pokemon) => {
          // handle duplicate pokemon
          if (pokemonData.some((x) => x.title === pokemon.name)) return;

          const pokemonInfo = {
            title: pokemon.name,
            image: pokemon.sprites.front_default,
            id: pokemonData.length + 1,
          };
          pokemonData.push(pokemonInfo);
        });
      fetchPromises.push(fetchPromise);
    }
    Promise.all(fetchPromises).then(() => setDataset(pokemonData));
  }, []);

  useEffect(() => {
    console.log("check length: ", dataset.length);
    if (dataset.length > 0) {
      setVisibleCards(dataset.slice(0, NUM_CARDS));
    }
  }, [dataset]);

  const getVisibleCards = (selectedCards) => {
    const reducedDeck = [];
    console.log("next: ", selectedCards.length);
    const max_repeats =
      selectedCards.length < NUM_CARDS ? selectedCards.length : NUM_CARDS - 1;

    // get previously selected cards
    for (let i = 0; i < max_repeats; i++) {
      // get random selected card
      let randomIndex = Math.floor(Math.random() * selectedCards.length);
      while (reducedDeck.includes(selectedCards[randomIndex])) {
        randomIndex = Math.floor(Math.random() * selectedCards.length);
      }
      reducedDeck.push(selectedCards[i]);
    }

    // get new cards from deck
    for (let i = 0; i < NUM_CARDS - max_repeats; i++) {
      let randomIndex = Math.floor(Math.random() * dataset.length);
      while (reducedDeck.includes(dataset[randomIndex])) {
        randomIndex = Math.floor(Math.random() * dataset.length);
      }
      reducedDeck.push(dataset[randomIndex]);
    }
    // shuffle this new deck
    reducedDeck.sort(() => Math.random() - 0.5);

    setVisibleCards(reducedDeck);
  };

  const handleCardClick = (id) => {
    const card = dataset.find((card) => card.id === id);
    // game logic here
    // check the current selected cards
    if (selectedCards.some((x) => x.id === id)) {
      // if the card is already selected, game over
      return;
    } else {
      setSelectedCards([...selectedCards, card]);
      getVisibleCards([...selectedCards, card]);
    }
    // if the card is not selected,
    // increase score
    // change the selected cards

    // reset the selected cards
  };
  // set the selected cards
  return (
    <div className="App">
      {dataset.length > 0 && (
        <Cards cards={visibleCards} handleCardClick={handleCardClick} />
      )}
    </div>
  );
}

export default App;
