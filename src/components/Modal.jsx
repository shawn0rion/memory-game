import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  gap: 10px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  padding: 40px;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  border: 4px solid #222;
  align-items: center;
  font-size: 1.2rem;
  justify-content: center;

  & .game-over {
    font-size: 2rem;
    font-weight: bold;
  }

  & button {
    margin-top: 10px;
    font-weight: bold;
    padding: 15px 25px;
    color: #fff;
    background-color: #222;
    border: 2px solid #222;
    transition: all 0.2s ease-in-out;
  }

  #score {
    font-weight: bold;
    color: red;
    margin-left: 2px;
    font-size: 1.5rem;
  }

  & button:hover,
  & button:focus {
    cursor: pointer;
    background-color: #fff;
    color: #222;
    border: 2px solid #222;
  }
`;

export default function Modal(props) {
  const { score, gameOver, onResetClick } = props;

  return (
    <>
      {gameOver && (
        <ModalContainer>
          <span className="game-over">Game over!</span>
          <span>
            Your score is <span id="score">{score}</span>
          </span>
          <button onClick={onResetClick}>Play again</button>
        </ModalContainer>
      )}
    </>
  );
}
