import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styled from "styled-components";
import Cards from "./components/Cards.jsx";
import Score from "./components/Score.jsx";
import Modal from "./components/Modal.jsx";
import Loader from "./components/Loader.jsx";
import { GlobalStyle } from "./Theme.js";
import "./App.css";

const StyledApp = styled.div`
  position: relative;

  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataset, setDataset] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  // TODO: score and game over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => localStorage.getItem("highScore") || 0
  ); // TODO: local storage
  const [gameOver, setGameOver] = useState(false);

  const NUM_CARDS = 6;

  // GET data from external api
  useEffect(() => {
    fetchData();
  }, []);

  // set the cards to be displayed after the dataset is loaded
  useEffect(() => {
    if (dataset.length > 0) {
      setVisibleCards(dataset.slice(0, NUM_CARDS));
    }
  }, [dataset]);
  const fetchData = async () => {
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
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      fetchPromises.push(fetchPromise);
    }
    Promise.all(fetchPromises).then(() => setDataset(pokemonData));
  };

  useEffect(() => {
    // blur the active element if any element (card) is focued
    if (document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  }, [selectedCards]);

  // get some cards from the deck to display
  const getVisibleCards = (selectedCards) => {
    const reducedDeck = [];
    console.log("next: ", selectedCards.length);
    // set a fixed amount of previously selected cards to be displayed
    const max_repeats =
      selectedCards.length < NUM_CARDS ? selectedCards.length : NUM_CARDS - 2;

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

  const updateScore = () => {
    setScore(score + 1);
    // update local storage
    if (score + 1 > highScore) {
      setHighScore(score + 1);
      localStorage.setItem("highScore", score + 1);
    }
  };

  const handleCardClick = (id) => {
    // get the card from the dataset
    const card = dataset.find((card) => card.id === id);

    // check the current selected cards
    if (selectedCards.some((x) => x.id === id)) {
      // if the card is already selected, game over
      handleGameOver();
      return;
    } else {
      updateScore();
      setSelectedCards([...selectedCards, card]);
      getVisibleCards([...selectedCards, card]);
    }
    // if the card is not selected,
    // increase score
    // change the selected cards

    // reset the selected cards
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleResetClick = () => {
    setGameOver(false);
    setDataset([]);
    setScore(0);
    setSelectedCards([]);
    setVisibleCards([]);
    fetchData();
  };
  // set the selected cards
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {isLoading && <Loader />}
        {!gameOver && dataset.length > 0 && (
          <>
            <Score score={score} highScore={highScore} />
            <Cards cards={visibleCards} handleCardClick={handleCardClick} />
          </>
        )}
        {gameOver && (
          <Modal
            score={score}
            gameOver={gameOver}
            onResetClick={handleResetClick}
          />
        )}
      </StyledApp>
    </>
  );
}

export default App;
