import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #343a40;
  padding: 0;
  position: fixed;
  width: 100vw;
  height: 60px;
  z-index: 10;
  top: 0px;
  @media (max-width: 1000px) {
    padding: 15px 0;
  }

  header {
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px ')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1000px) {
      padding: 0 10px;
      flex-direction: column;
    }

    div {
      display: flex;
      align-items: center;
      margin: 3px 0 3px 0;

      img {
        height: 48px;
        margin: 0 10px 0 0;
      }

      strong {
        color: #02AA4D;
        font-size: 35px;
        font-weight: 100;
      }
    }



    nav {
      @media (max-width: 1000px) {
        margin-top: 20px;
      }
      a {
        color: #02AA4D;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        padding-bottom: 10px;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
      }
      .headerNavLinkSelect {
        border-bottom: solid 2px #ff872c;
      }
    }
  }
`;
