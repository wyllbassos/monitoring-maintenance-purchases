/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import {
  Container,
  Content,
  Body,
  SidebarContent,
  SidebarButtons,
  SidebarButtonShowHide,
  Footer,
} from './styles';

import { Menu, MenuOpen } from '@material-ui/icons';

import Header from '../Header';
import { useState } from 'react';
import { usePageBase } from '../../hooks/pageBase';

const PageBase: React.FC = ({ children }) => {
  const [selectedSidebarButtonState, setSelectedSidebarButtonState] = useState(
    0,
  );
  const [isSideBarShow, handleShowSideBar] = useState(false);

  const { sidebarComponent, sidebarButtons } = usePageBase();

  console.log(sidebarButtons);

  return (
    <Container>
      <Header />
      <Body>
        {!!sidebarComponent && (
          <SidebarContent isSideBarShow={isSideBarShow}>
            {sidebarComponent}
          </SidebarContent>
        )}

        {!!sidebarButtons && (
          <SidebarContent isSideBarShow={isSideBarShow}>
            {sidebarButtons.map((sidebarButton, index) => (
              <SidebarButtons
                key={sidebarButton.text + index}
                selected={index === selectedSidebarButtonState}
                onClick={() => {
                  setSelectedSidebarButtonState(index);
                  sidebarButton.onClick && sidebarButton.onClick();
                }}
              >
                {sidebarButton.text}
              </SidebarButtons>
            ))}
          </SidebarContent>
        )}

        {(!!sidebarComponent || !!sidebarButtons) && (
          <SidebarButtonShowHide
            onClick={() => handleShowSideBar(!isSideBarShow)}
          >
            {isSideBarShow ? <MenuOpen /> : <Menu />}
          </SidebarButtonShowHide>
        )}
        <Content isSideBarShow={isSideBarShow}>{children}</Content>
      </Body>
    </Container>
  );
};

export default PageBase;
