import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const ContainerTable = styled.div`
  display: flex;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  max-height: calc(100vh - 60px);
`;
