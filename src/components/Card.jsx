import styled from "styled-components";

const StyledCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  height: 260px;
  width: 180px;
  padding: 0px;
  background-color: #000;
  color: #000;
  transition: all 0.2s ease-in-out;
  border: 2px solid black;
  & img {
    padding: 10px;
    height: 80%;
    width: 100%;
    border-radius: 20px 20px 0 0;
    object-fit: cover;
    background-color: #000;
  }
  &:hover,
  &:focus {
    cursor: pointer;
    transform: scale(1.1);
    border-color: #000;
  }
  & span {
    width: 100%;
    height: 30%;
    padding: 20px;
    border-bottom: 8px solid black;
    border-radius: 0px 0px 20px 20px;
    background-color: white;
    border-top: 2px solid black;
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: capitalize;
  }

  &:hover,
  &:focus {
    outline: 0;
  }
`;

export default function Card(props) {
  const { id, src, title, onCardClick } = props;
  return (
    <StyledCard onClick={() => onCardClick(id)}>
      <img src={src} alt={title} />
      <span>{title}</span>
    </StyledCard>
  );
}
