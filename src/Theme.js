import { createGlobalStyle } from "styled-components";
import Background from "./assets/pokemon-stadium.jpg";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100%;
background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url(${Background});
    background-blend-mode: screen;
    background-size: cover;
    background-position: center;

}
`;

export { GlobalStyle };
