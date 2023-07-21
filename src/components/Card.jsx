import styled from "styled-components";

const StyledCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 200px;

  & img {
    height: 80%;
    width: 100%;
    object-fit: cover;
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
