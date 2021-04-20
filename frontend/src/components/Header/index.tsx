import React from 'react';

import { format } from 'date-fns';

import { Link } from 'react-router-dom';

import { Container, HeaderTitle, HeaderMenu } from './styles';

// import './styles.css';

import Logo from '../../assets/logo.svg';
import { usePageBase } from '../../hooks/pageBase';

interface HeaderProps {
  updateAt?: Date;
}

const Header: React.FC<HeaderProps> = ({ updateAt }: HeaderProps) => {
  const { pageBaseItens, handleChangePageBaseItens } = usePageBase();
  return (
    <Container>
      <HeaderTitle>
        <img src={Logo} alt="PCMFibraplac" />
        <strong>fibraplac PCM</strong>

        <small>
          <span>Atualizado:</span>
          {updateAt ? format(new Date(updateAt), 'dd/MM/yy HH:mm') : ''}
        </small>
      </HeaderTitle>

      <HeaderMenu>
        {pageBaseItens.map(pageBaseIten => {
          const { route, selected } = pageBaseIten;
          return (
            <button
              key={route}
              onClick={() => handleChangePageBaseItens(route)}
              className={selected ? 'headerNavLinkSelect' : ''}
            >
              {route}
            </button>
          );
        })}
      </HeaderMenu>
    </Container>
  );
};

export default Header;
