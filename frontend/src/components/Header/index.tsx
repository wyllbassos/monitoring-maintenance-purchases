import React from 'react';

import { format } from 'date-fns';

import { Container, HeaderTitle, HeaderMenu } from './styles';

import Logo from '../../assets/logo.svg';
import { usePageBase } from '../../hooks/pageBase';

type HeaderProps = {
  updateAt?: Date;
};

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
              type="button"
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

Header.defaultProps = {
  updateAt: undefined,
};

export default Header;
