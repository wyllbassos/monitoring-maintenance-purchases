import styled from 'styled-components';

export const ContainerTablePCs = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 16px;
  height: auto;
  margin: 24px 0;
  div {
    background-color: #fff;
    height: 30px;
    border-radius: 15px;
    display: flex;
    padding: 0 8px;
    justify-content: space-between;
    align-items: center;
    box-shadow: 4px 4px 8px;
    button {
      border: 0;
      margin-right: 8px;
      color: red;
      font-size: 12px;
    }
  }
`;
