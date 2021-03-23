import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  flex: 1;
  max-height: 100vh;

  textarea {
    width: 100%;
    height: 200px;
    min-height: 200px;
    resize: none;
  }
`;

export const Menu = styled.header`
  background-color: #343a40;
  display: flex;
  flex-direction: column;
  margin: 0 0 16px 0;
  position: absolute;
  left: 0;
  height: 100%;
  top: 0;
  padding-top: 60px;

  button {
    width: 100%;
    color: #02aa4d;
    border: 0;
    background-color: #343a40;
    height: 40px;
    transition: background-color 0.5s;
    text-align: left;
    padding: 0 16px;
    &:hover {
      transition: background-color 0.5s;
      background-color: #02aa4d;
      color: #343a40;
    }

    /* selecionado
      background-color: #02aa4d;
      color: #343a40; */
  }
`;
