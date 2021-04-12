import styled from 'styled-components';

export const Container = styled.ul`
  width: 100%;
  max-width: 1120px;

  padding: 24px;
  display: flex;
  overflow-y: auto;
  flex: 1;
  flex-direction: column;
  max-height: calc(100vh - 160px);

  li {
    & + li {
      margin-top: 16px;
    }
  }

  li {
    background-color: #343a40;
    padding: 16px;
    box-shadow: black 4px 4px 8px;
    @media (max-width: 500px) {
      padding: 8px;
    }
  }
`;
export const Item = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
`;

export const ContainerDados = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  column-gap: 8px;
  justify-content: space-between;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;

  @media (max-width: 500px) {
    align-items: flex-start;
    flex-direction: column;
  }

  svg {
    color: #fff;
  }

  strong {
    font-weight: 400;
    font-size: 16px;
    color: #02aa4d;

    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  span {
    font-weight: 400;
    font-size: 16px;
    color: #fff;

    @media (max-width: 500px) {
      font-size: 14px;
    }
  }

  span,
  strong {
    margin-left: 8px;
  }
`;

export const ContainerDescricoes = styled.div``;
