import styled from "styled-components";
const ScoreContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid black;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;

  margin-bottom: 50px;
  & .score {
    padding: 10px 20px;
    font-size: 1.5rem;
    border-right: 1px solid black;
  }

  & .high-score {
    padding: 10px 20px;
    font-size: 1.5rem;
  }
`;

export default function Score(props) {
  const { score, highScore } = props;
  return (
    <ScoreContainer>
      <span className="score">Score: {score}</span>
      <span className="high-score">High Score: {highScore}</span>
    </ScoreContainer>
  );
}
