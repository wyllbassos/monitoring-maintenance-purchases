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
    <small>
      <span>Atualizado:</span>
      {updateAt ? format(new Date(updateAt), 'dd/MM/yy HH:mm') : ''}
    </small>
    <header>
      <div>
        <img src={Logo} alt="PCMFibraplac" />
        <strong>fibraplac PCM</strong>
      </div>
      <nav>
        <Link to="/" className={selected === '/' ? 'headerNavLinkSelect' : ''}>
          Lista
        </Link>
        <Link
          to="/nivel-1"
          className={selected === '/nivel-1' ? 'headerNavLinkSelect' : ''}
        >
          Nível 1
        </Link>
        <Link
          to="/nivel-2"
          className={selected === '/nivel-2' ? 'headerNavLinkSelect' : ''}
        >
          Nível 2
        </Link>
        <Link
          to="/custos"
          className={selected === '/custos' ? 'headerNavLinkSelect' : ''}
        >
          Custos
        </Link>
        <Link
          to="/prioridades"
          className={selected === '/prioridades' ? 'headerNavLinkSelect' : ''}
        >
          Prioridades
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
