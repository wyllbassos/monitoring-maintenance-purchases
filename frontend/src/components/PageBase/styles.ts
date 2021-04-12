import styled from 'styled-components';

interface SidebarButtonsProps {
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

  @media (max-width: 1550px) {
    * {
      font-size: 14px !important;
    }
  }
  @media (max-width: 1300px) {
    * {
      font-size: 12px !important;
    }
  }
  @media (max-width: 1100px) {
    * {
      font-size: 10px !important;
    }
  }
  @media (max-width: 850px) {
    * {
      font-size: 8px !important;
    }
  }
  @media (max-width: 650px) {
    * {
      font-size: 6px !important;
    }
  }
  @media (max-width: 400px) {
    * {
      font-size: 5px !important;
    }
  }
`;

export const Sidebar = styled.header`
  display: flex;
  height: calc(100vh - 60px);
  overflow-y: auto;
  width: 220px;
  flex-direction: column;
  background-color: #343a40;
  box-shadow: black 2px 3px 3px;
  z-index: 20;

  @media (max-width: 1550px) {
    width: 180px;
  }
  @media (max-width: 1300px) {
    width: 150px;
  }
  @media (max-width: 1100px) {
    width: 120px;
  }
  @media (max-width: 850px) {
    width: 100px;
  }
  @media (max-width: 650px) {
    width: 70px;
  }
  @media (max-width: 400px) {
    width: 60px;
  }
`;

export const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  textarea {
    flex: 1;
    resize: none;
    padding: 0 16px;
    width: -webkit-fill-available;
  }
`;

export const SidebarButtons = styled.button<SidebarButtonsProps>`
  width: 100%;
  color: ${({ selected }) => (selected ? '#343a40' : '#02aa4d')};
  border: 0;
  background-color: ${({ selected }) => (selected ? '#02aa4d' : '#343a40')};
  min-height: 40px;
  transition: opacity 0.5s;
  text-align: left;
  padding: 0 16px;

  @media (max-width: 1100px) {
    min-height: 30px;
    padding: 0 10px;
  }
  @media (max-width: 650px) {
    min-height: 20px;
    padding: 0 4px;
  }
  @media (max-width: 400px) {
    min-height: 15px;
    padding: 0 2px;
  }

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
  // align-items: flex-start;
  overflow-y: auto;
`;

export const Footer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 220px;
  min-height: 60px;
  height: 60px;
  width: calc(100vw - 220px);
  z-index: 20;
  /* bottom: 0px; */
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #343a40;
  box-shadow: black 6px -6px 8px;
`;
