import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const ContainerTable = styled.div`
  display: flex;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 60px);

  table {
    border-spacing: 0;

    td,
    th,
    & {
      border: 1px solid #343a40;
    }

    td,
    th {
      padding: 5px;
    }
  }
`;
