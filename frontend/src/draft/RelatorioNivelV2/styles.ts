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

export const ContainerTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1120px 1fr;
  width: 100%;
  flex: 1;
  max-height: calc(100vh - 60px);
`;
