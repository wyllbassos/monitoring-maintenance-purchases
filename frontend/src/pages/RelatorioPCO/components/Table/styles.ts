import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const TableContent = styled.table`
  margin-top: 16px;
  width: 100%;
  table-layout: fixed;

  &,
  thead tr th,
  tbody tr td {
    border: 1px solid #343a40;
    border-spacing: 0;
  }

  thead tr th,
  tbody tr td {
    padding: 14px;
    background-color: #fff;
    color: #000;
  }

  @media (max-width: 1550px) {
    thead tr th,
    tbody tr td {
      padding: 12px;
    }
  }
  @media (max-width: 1300px) {
    thead tr th,
    tbody tr td {
      padding: 8px;
      border: 0.6px solid #343a40;
    }
  }
  @media (max-width: 1100px) {
    thead tr th,
    tbody tr td {
      padding: 4px;
    }
  }
  @media (max-width: 850px) {
    thead tr th,
    tbody tr td {
      padding: 2px;
      border: 0.3px solid #343a40;
    }
  }
  @media (max-width: 750px) {
    thead tr th,
    tbody tr td {
      padding: 1px;
    }
  }
  @media (max-width: 400px) {
    thead tr th,
    tbody tr td {
      padding: 0px;
    }
  }
`;
