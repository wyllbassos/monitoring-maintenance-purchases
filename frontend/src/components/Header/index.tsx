import React from 'react';

import { Link } from 'react-router-dom';

import { Container } from './styles';

// import './styles.css';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  selected: string;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  selected,
}: HeaderProps) => (
  <Container size={size}>
    <header>
      <div>
        <img src={Logo} alt="PCMFibraplac" />
        <strong>fibraplac PCM</strong> 
      </div>
      <nav>
        <Link to="/" className={selected === '/' ? 'headerNavLinkSelect' : ''}>
          Compras
        </Link>
        <Link
          to="/import"
          className={selected === '/import' ? 'headerNavLinkSelect' : ''}
        >
          Importar
        </Link>
      </nav>
    </header>
  </Container>
);

export default Header;
