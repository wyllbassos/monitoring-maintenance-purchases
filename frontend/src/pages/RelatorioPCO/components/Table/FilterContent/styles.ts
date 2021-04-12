import styled from 'styled-components';

export const Content = styled.div`
  margin: 0;
  padding: 0;
`;

export const FilterInputsContent = styled.div`
  margin-top: 16px;
  display: flex;
  width: 100%;
  justify-content: center;

  select,
  input,
  button {
    padding: 4px 16px;
    font-size: 16px;
    margin: 0 8px;

    @media (max-width: 1100px) {
      padding: 2px 8px;
      margin: 0 4px;
    }
    @media (max-width: 750px) {
      padding: 2px 4px;
    }
  }
`;
