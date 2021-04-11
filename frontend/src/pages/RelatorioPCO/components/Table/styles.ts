import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  select {
    margin: 16px;
  }
`;

export const FilterContent = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  select,
  input,
  button {
    padding: 4px 16px;
    font-size: 16px;
    margin: 16px 8px 16px;
  }
`;

export const TableContent = styled.table`
  &,
  thead tr th,
  tbody tr td {
    border: 1px solid #343a40;
    border-spacing: 0;
  }

  thead tr th,
  tbody tr td {
    padding: 16px;
    background-color: #fff;
    color: #000;
  }
`;
