import React from 'react';

import { format } from 'date-fns';

import { Link } from 'react-router-dom';

import { Container } from './styles';

// import './styles.css';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  selected: string;
  updateAt?: Date;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  selected,
  updateAt,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <div>
        <img src={Logo} alt="PCMFibraplac" />
        <strong>fibraplac PCM</strong>

        <small>
          <span>Atualizado:</span>
          {updateAt ? format(new Date(updateAt), 'dd/MM/yy HH:mm') : ''}
        </small>
      </div>

      <nav>
        <Link to="/" className={selected === '/' ? 'headerNavLinkSelect' : ''}>
          Lista
        </Link>

        <Link
          to="/pcs-bloqueados"
          className={
            selected === '/pcs-bloqueados' ? 'headerNavLinkSelect' : ''
          }
        >
          PC's Bloqueados
        </Link>

        <Link
          to="/relatorio-pco"
          className={selected === '/relatorio-pco' ? 'headerNavLinkSelect' : ''}
        >
          PCO
        </Link>

        <Link
          to="/custos"
          className={selected === '/custos' ? 'headerNavLinkSelect' : ''}
        >
          Custos
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
