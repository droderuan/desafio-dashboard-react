import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0 32px 16px;
  gap: 16px;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const GridItem = styled.div``;
