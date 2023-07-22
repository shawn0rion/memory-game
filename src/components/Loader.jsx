import styled, { keyframes } from "styled-components";
import Pokeball from "../assets/pokeball.png";

const spin = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const StyledLoader = styled.img`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  transform: translate(-50%, -50%);
  height: 100px;
  width: 100px;
  animation: ${spin} 1s linear infinite;
`;

export default function Loader() {
  return <StyledLoader src={Pokeball} alt="pokeball loader" />;
}
