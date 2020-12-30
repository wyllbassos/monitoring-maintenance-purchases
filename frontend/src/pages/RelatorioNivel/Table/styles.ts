import styled from 'styled-components';

export const Container = styled.table`
  border-spacing: 0;
  border: 1px solid #343a40;
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

        input {
          width: 147px;
          background: #02aa4d;
          border: 0;
          padding: 0;
        }

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
