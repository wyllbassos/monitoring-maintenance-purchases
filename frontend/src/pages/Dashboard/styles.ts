import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
  @media (max-width: 1000px) {
    padding: 10px 10px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const TableContainer = styled.section`
  margin-top: 64px;
  @media (max-width: 1000px) {
    margin-top: 0px;
  }
  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #343a40;
      font-weight: normal;
      padding: 20px;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      @media (max-width: 1000px) {
        &:first-child {
          padding-left: 15px;
        }
        padding: 5px 0px;
        font-size: 10px;
      }
    }

    td {
      padding: 20px;
      border: 0;
      background: #fff;
      font-size: 16px;
      font-weight: normal;
      color: #343a40;

      @media (max-width: 1000px) {
        &:first-child {
          padding-left: 15px;
        }
        padding: 5px 0px;
        font-size: 10px;
        line-height: 30px;
      }

      &.title {
        color: #363f5f;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }

    td:first-child {
      border-radius: 8px 0 0 8px;
    }

    td:last-child {
      border-radius: 0 8px 8px 0;
    }
  }
`;
