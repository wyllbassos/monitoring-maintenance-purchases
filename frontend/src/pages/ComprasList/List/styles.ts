import styled from 'styled-components';

export const Container = styled.ul`
  width: 100%;
  max-width: 1120px;
  /* position: absolute; */
  /* top: 80px; */
  
  padding: 24px;
  display: flex;
  overflow-y: auto;
  flex: 1;
  flex-direction: column;
  max-height: calc(100vh - 160px);
  
  @media (max-width: 1000px) {
    
  }

    li {
        & + li {
            margin-top: 16px;
        }
    }

    li {
        background-color: #343a40;
        padding: 16px;
        box-shadow: black 8px 8px 16px;
    }
`

export const Item = styled.li`
    list-style-type: none;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    
    span {
      display: block;
      color: #FFF;
      font-size: 16px;
      font-weight: normal;

      @media (max-width: 1000px) {
        font-size: 12px;
      }
    }

    section {
      display: flex;

      &:first-child {
        border-bottom: 1px dashed #FFF;
        padding-bottom: 8px;
      }
    }
`

export const ContainerDados = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: 1fr 1.7fr 1fr 1.7fr;
  grid-template-rows: repeat(2, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
`;

export const ContainerDescricoes = styled.div`
  span {
    margin-top: 8px;
  }
`;