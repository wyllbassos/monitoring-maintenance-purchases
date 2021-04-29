import React, { useState } from 'react';

import { Menu, MenuOpen } from '@material-ui/icons';

import Header from '../Header';
import { usePageBase } from '../../hooks/pageBase';

import {
  Container,
  Content,
  Body,
  SidebarContent,
  SidebarButtons,
  SidebarButtonShowHide,
} from './styles';

type PageBaseProps = {
  children: React.ReactNode;
};

const PageBase: React.FC<PageBaseProps> = ({ children }: PageBaseProps) => {
  const [selectedSidebarButtonState, setSelectedSidebarButtonState] = useState(
    0,
  );
  const [isSideBarShow, handleShowSideBar] = useState(false);

  const { sidebarComponent, sidebarButtons } = usePageBase();

  return (
    <Container>
      <Header />
      <Body>
        {(!!sidebarComponent || !!sidebarButtons) && (
          <>
            <SidebarContent isSideBarShow={isSideBarShow}>
              {sidebarComponent}

              {!!sidebarButtons &&
                sidebarButtons.map((sidebarButton, index) => (
                  <SidebarButtons
                    key={sidebarButton.text + String(index)}
                    selected={index === selectedSidebarButtonState}
                    onClick={() => {
                      setSelectedSidebarButtonState(index);
                      if (sidebarButton.onClick) sidebarButton.onClick();
                    }}
                  >
                    {sidebarButton.text}
                  </SidebarButtons>
                ))}
            </SidebarContent>
            <SidebarButtonShowHide
              onClick={() => handleShowSideBar(!isSideBarShow)}
            >
              {isSideBarShow ? <MenuOpen /> : <Menu />}
            </SidebarButtonShowHide>
          </>
        )}

        <Content isSideBarShow={isSideBarShow}>{children}</Content>
      </Body>
    </Container>
  );
};

export default PageBase;
