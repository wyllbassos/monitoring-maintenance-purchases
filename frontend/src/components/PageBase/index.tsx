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

interface PageBaseProps {
  sidebarComponent?: JSX.Element;
  sidebarButtons?: Array<{
    text: string;
    onClick?: any;
  }>;
  selectedSidebarButton?: number;
  route: string;
}

const PageBase: React.FC<PageBaseProps> = ({
  children,
  sidebarComponent,
  sidebarButtons,
  selectedSidebarButton,
  route,
}) => {
  const [selectedSidebarButtonState, setSelectedSidebarButtonState] = useState(
    selectedSidebarButton || 0,
  );
  const [isSideBarShow, setIsSideBarShow] = useState(false);

  return (
    <Container>
      <Header selected={route} />
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
            onClick={() => setIsSideBarShow(!isSideBarShow)}
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
