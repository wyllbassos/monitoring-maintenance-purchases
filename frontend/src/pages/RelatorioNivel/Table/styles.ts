import styled from 'styled-components';

export const Container = styled.table`
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
  td input {
    width: 147px;
    background: #02aa4d;
    border: 0;
    padding: 0;
  }
  td select {
    font: 16px 'Poppins', sans-serif;
    background: #02aa4d;
    border: 0;
    padding: 0;
  }
`;
