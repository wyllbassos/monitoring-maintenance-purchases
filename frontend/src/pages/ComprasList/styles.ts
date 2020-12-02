import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  /* position: absolute; */
  /* top: 80px; */
  
  padding: 24px;
  display: flex;
  overflow-y: auto;
  flex: 1;
  flex-direction: column;
  
  @media (max-width: 1000px) {
    
  }
`;

export const Filtros = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    background: #343a40;
    height: 40px;
    box-shadow: black 0px 8px 16px;
    z-index: 10;

    label {
      color: #02AA4D;
    }

    select {
      height: 30px;
      margin-left: 10px;
    }

    input {
      height: 30px;
      width: 40%;
      margin-left: 10px;
    }
`

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
  box-shadow: black 0px -4px 8px;

  label {
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
`

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;
