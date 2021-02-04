import styled from 'styled-components';

export const Container = styled.table`
  border-spacing: 0;
  border: 1px solid #343a40;
  background-color: #fff;
  color: #000;
  thead {
    tr {
      th {
        border: 1px solid #343a40;
        padding: 5px;
      }
    }
  }

  tbody {
    tr {
      td {
        border: 1px solid #343a40;
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
