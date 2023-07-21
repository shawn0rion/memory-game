import styled from "styled-components";
import Card from "./Card.jsx";
const StyledCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);

  @media (max-width: 440px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
`;

export default function Cards(props) {
  const { cards, handleCardClick } = props;
  // here i minimize the eck to 6

  return (
    <StyledCards>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          src={card.image}
          title={card.title}
          onCardClick={handleCardClick}
        />
      ))}{" "}
    </StyledCards>
  );
}
