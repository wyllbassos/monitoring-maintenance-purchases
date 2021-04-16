import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const ContainerList = styled.div`
  width: 100%;
  max-width: 1200px;
  height: calc(100% - 80px);
  overflow-y: auto;

  @media (max-width: 1300px) {
    grid-template-columns: 100%;
    justify-items: center;
  }
`;

export const FiltersList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: #fff;
  @media (max-width: 1300px) {
    display: none;
  }
`;

export const Filtros = styled.div`
  display: flex;
  justify-content: center;
  width: calc(100% + 64px);
  background: #343a40;
  height: 40px;
  // box-shadow: black 0px 3px 3px;
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
  width: calc(100% + 64px);
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #343a40;
  padding: 8px 0;

  span {
    color: #fff;
    margin-right: 8px;
  }

  select,
  input {
    height: 100%;
    margin-right: 16px;
  }

  input {
    width: 50px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;
