import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1120px 1fr;
  width: 100%;
  flex: 1;
  max-height: calc(100vh - 160px);
  @media (max-width: 1300px) {
    grid-template-columns: 100%;
    justify-items: center;
  }
`;

export const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  @media (max-width: 1300px) {
    display: none;
  }
`;

export const Filtros = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #343a40;
  height: 40px;
  box-shadow: black 0px 3px 3px;
  z-index: 20;
  padding: 0 25%;

  span {
    color: #02aa4d;
  }

  select,
  button {
    height: 30px;
    margin-left: 10px;
  }

  button {
    padding: 0 8px;
  }

  input {
    height: 30px;
    flex: 1;
    margin-left: 10px;
  }
`;

export const Paginacao = styled.section`
  /* position: fixed; */
  width: 100vw;
  height: 60px;
  /* bottom: 0px; */
  display: flex;
  /* flex: 1; */
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #343a40;
  box-shadow: black 0px -3px 3px;

  span {
    color: #fff;
    margin-right: 16px;
  }

  select {
    margin-left: 8px;
    height: 30px;
  }

  input {
    width: 100px;
    margin-right: 8px;
  }

  button {
    width: 32px;
    margin-right: 8px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;
