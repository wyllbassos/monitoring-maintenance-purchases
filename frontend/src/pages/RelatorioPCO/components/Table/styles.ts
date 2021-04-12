import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
  height: fit-content;
  overflow: auto;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  margin-top: 16px;
`;

export const TableContent = styled.table`
  width: 100%;
  align-self: baseline;
  border-spacing: 0;
  // table-layout: fixed;

  thead tr th,
  tbody tr td {
    border-bottom: 1px solid #000;
    border-right: 1px solid #000;
    padding: 16px 8px;
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
