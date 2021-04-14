import styled, { keyframes } from 'styled-components';

interface SideBarShow {
  isSideBarShow: boolean;
}

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

export const SidebarButtonShowHide = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  color: #02aa4d;
  z-index: 30;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export const SidebarContent = styled.div<SideBarShow>`
  display: flex;
  height: calc(100vh - 40px);
  overflow-y: auto;
  height: 100%;
  background-color: #343a40;
  width: 220px;
  flex-direction: column;
  // box-shadow: black 2px 3px 3px;
  z-index: 20;

  transition-duration: 1s;
  position: fixed;
  left: ${({ isSideBarShow }) => (isSideBarShow ? '0px' : '-220px')};

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

export const SidebarButtons = styled.button<SidebarButtonsProps>`
  width: 100%;
  border: 0;
  background-color: ${({ selected }) => (selected ? '#02aa4d' : '#343a40')};
  color: ${({ selected }) => (selected ? '#343a40' : '#02aa4d')};
  /* background-color: #343a40;
  color: #02aa4d;
  border-bottom: ${({ selected }) => (selected ? 'solid 2px #343a40' : '0')}; */
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

export const Content = styled.div<SideBarShow>`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: calc(100vh - 40px);
  padding: ${({ isSideBarShow }) =>
    isSideBarShow ? '0px 32px 0px 252px' : '0px 32px;'};
  align-items: center;
  // align-items: flex-start;
  overflow-y: auto;
  transition-duration: 1s;
  // margin-right:
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
  // box-shadow: black 6px -6px 8px;
`;
