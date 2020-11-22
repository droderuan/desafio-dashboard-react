import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const Container = styled.div`
  width: 100%;
  .background-white {
    background-color: white;
  }
`;

export const HeaderContent = styled.div`
  padding-top: 16px;
`;

export const ChartsContainer = styled(Content)`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;
