import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  height: 30px;
  border-radius: 15px;
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
  align-items: center;
  // box-shadow: 4px 4px 8px;
  button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border-width: 1pt;
    margin-right: 8px;
    font-size: 12px;
    background-color: rgb(52 58 64);
    color: #02aa4d;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.5;
    }
  }
`;
