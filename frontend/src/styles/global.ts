import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #02AA4D;
    color: #343a40;
    -webkit-font-smoothing: antialiased
  }

  body, input, button {
    font: 16px "Poppins", sans-serif;
  }

  button {
    cursor: pointer;
  }
  #root{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
`;
