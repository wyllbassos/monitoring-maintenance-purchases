import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  background: #343a40;
  align-items: center;
  width: 100vw;
  height: 40px;
  max-height: 40px;
  z-index: 20;
  margin: 0;
  padding: 8px 40px;
  color: #02aa4d;
  flex: 1;

  @media (max-width: 1000px) {
  }
`;

export const HeaderTitle = styled.div`
  display: flex;
  height: 100%;
  align-items: center;

  img {
    height: 100%;
    margin-right: 8px;
  }

  strong {
    font-size: 20px;
    font-weight: 100;
    margin-right: 8px;

    @media (max-width: 1000px) {
      font-size: 16px;
    }
  }

  small span {
    margin-right: 8px;
  }
`;

export const HeaderMenu = styled.nav`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  height: 100%;

  a {
    color: #02aa4d;
    text-decoration: none;
    font-size: 16px;
    transition: opacity 0.2s;
    padding-bottom: 4px;
    margin-left: 16px;

    @media (max-width: 1000px) {
      font-size: 12px;
    }

    &:hover {
      opacity: 0.6;
    }
  }
  .headerNavLinkSelect {
    border-bottom: solid 2px #02aa4d;
  }
`;
