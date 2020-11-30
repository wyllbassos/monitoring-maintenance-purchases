import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  position: absolute;
  top: 80px;
  margin: 0 auto;
  padding: 0 20px 10px 20px;
  display: flex;
  flex-direction: column;
  
  div {
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 16px;
  }

  @media (max-width: 1000px) {
    padding: 0px 20px;
    top: 0px;
  }
`;

export const ContainerFiltros = styled.section`
  position: fixed;
  width: 100%;
  height: 60px;
  bottom: 0px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  z-index: 10;
  background-color: #343a40;
  box-shadow: black 0px -4px 8px;

  label {
    color: #fff;
    margin-right: 16px;
  }

  select {
    margin-left: 8px;
    height: 30px;
  }

  button {
    width: 32px;
    margin-right: 8px;
  }
`

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;
