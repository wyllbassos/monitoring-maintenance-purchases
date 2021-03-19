import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  padding-bottom: 32px;
  overflow-y: auto;
`;

export const TableStyled = styled.table`
  width: 100%;
  margin-top: 48px;
  border-spacing: 0;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  thead {
    tr {
      th {
        border: 1px solid #000;
        padding: 5px;

        div {
          display: flex;
          justify-content: center;
          align-items: center;

          svg {
            cursor: pointer;
          }

          span {
            font-weight: normal;
            margin: 0 8px;
          }

          strong {
          }
        }
      }
    }
  }

  tbody {
    tr {
      td,
      th {
        border: 1px solid #000;
        padding: 5px;

        div {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
        }

        select {
          font: 16px 'Poppins', sans-serif;
          background: #02aa4d;
          border: 0;
          padding: 0;
        }

        button {
          font: 16px 'Poppins', sans-serif;
          background: none;
          cursor: pointer;
          padding: 0;
          margin-left: 10px;
          border: none;
        }

        svg {
          cursor: pointer;
        }

        .centralizado-column {
          flex-direction: column;
          justify-items: center;
          align-content: center;
        }

        .no-size {
          width: min-content;
          height: min-content;
        }
      }
    }
  }
`;

export const Enfase = styled.em`
  font-weight: bold;
  margin: 0 8px;
  color: #000;
`;

export const FormControleAprovacao = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;

  div {
    display: flex;
    justify-content: center;

    input {
      width: 147px;
      background: #ffffff;
      cursor: pointer;
      border: 0;
      padding: 0;
    }

    svg {
      cursor: pointer;
    }
  }
`;
