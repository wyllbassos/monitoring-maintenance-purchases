import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 36px 0;
  flex: 1;
  max-height: 100vh;

  textarea {
    width: 100%;
    height: 200px;
    min-height: 200px;
    resize: none;
  }

  table,
  table thead tr th,
  table tbody tr td {
    border: 1px solid;
    border-spacing: 0;
  }

  table thead tr th,
  table tbody tr td {
    padding: 16px;
    background-color: #fff;
    color: #000;
  }
`;
