import styled from 'styled-components';

export const List = styled.ul`
    li {
        & + li {
            margin-top: 20px;
        }
    }

    li {
        background-color: #343a40;
    }
`

export const Item = styled.li`
    list-style-type: none;
    display: flex;
    border-radius: 8px;
    
    div {
        margin: 15px;

        &:first-child,
        &:first-child + div {
            width: 200px;
        }
        
        &:last-child{
            flex: 1;
        }
    }

    div + div {
        margin-left: 20px;
    }

    h1, strong, h2, span, p {
        color: #FFF;
        font-size: 14px;
        font-weight: normal;
    }

    h2, strong {
        margin: 15px 0;
    }

    span, strong {
        display: block;
    }
`



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
