/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';

import {
  Container,
  Content,
  Body,
  Sidebar,
  SidebarButtons,
  Footer,
} from './styles';

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

  return (
    <Container>
      <Header size="small" selected={route} />
      <Body>
        {!!sidebarComponent && <Sidebar>{sidebarComponent}</Sidebar>}
        {!!sidebarButtons && (
          <Sidebar>
            {sidebarButtons.map((sidebarButton, index) => (
              <SidebarButtons
                selected={index === selectedSidebarButtonState}
                onClick={() => {
                  setSelectedSidebarButtonState(index);
                  sidebarButton.onClick && sidebarButton.onClick();
                }}
              >
                {sidebarButton.text}
              </SidebarButtons>
            ))}
          </Sidebar>
        )}
        <Content>{children}</Content>
      </Body>
    </Container>
  );
};

export default PageBase;
