import styled from 'styled-components';

interface MenuProps {
  selected: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  justify-content: space-between;
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  textarea {
    flex: 1;
    resize: none;
    padding: 16px 16px 0 16px;
    width: -webkit-fill-available;
  }
`;

export const Menu = styled.header`
  display: flex;
  height: calc(100vh - 60px);
  overflow-y: auto;
  width: 220px;
  flex-direction: column;
  background-color: #343a40;
`;

export const MenuButton = styled.button<MenuProps>`
  width: 100%;
  color: ${({ selected }) => (selected ? '#343a40' : '#02aa4d')};
  border: 0;
  background-color: ${({ selected }) => (selected ? '#02aa4d' : '#343a40')};
  min-height: 40px;
  transition: opacity 0.5s;
  text-align: left;
  padding: 0 16px;

  &:hover {
    opacity: 0.5;
    background-color: #02aa4d;
    color: #343a40;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 60px);
  padding: 0 32px;
  align-items: center;
  overflow-y: auto;
`;
