import styled from 'styled-components';

interface CardProps {
  total?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  position: absolute;
  top: 60px;
  margin: 0 auto;
  padding: 0 20px 10px 20px;
  
  top: 60px;
  @media (max-width: 1000px) {
    padding: 20px 20px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;
