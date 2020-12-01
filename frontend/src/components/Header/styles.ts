import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #343a40;
  padding: 0;
  /* position: fixed; */
  width: 100vw;
  height: 60px;
  /* top: 0px; */
  z-index: 20;
  display: flex;
  align-items: center;
  
  @media (max-width: 1000px) {
    padding: 0px 16px;
  }

  header {
    max-width: 1120px;  
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px ')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;

    @media (max-width: 1000px) {
      padding: 0 10px;
      
    }

    div {
      display: flex;
      align-items: center;
      margin: 3px 0 3px 0;

      img {
        height: 48px;
        margin: 0 8px 0 0;
        @media (max-width: 1000px) {
          height: 24px;
        }
      }

      strong {
        color: #02AA4D;
        font-size: 35px;
        font-weight: 100;
        @media (max-width: 1000px) {
          font-size: 16px;
          font-weight: 100;
        }
      }
    }



    nav {
      a {
        color: #02AA4D;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;
        padding-bottom: 8px;

        @media (max-width: 1000px) {
          font-size: 12px;
        }

        & + a {
          margin-left: 32px;

          @media (max-width: 1000px) {
            margin-left: 8px;
          }
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
