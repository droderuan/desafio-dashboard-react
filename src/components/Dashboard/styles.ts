import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const Container = styled.div`
  .background-white {
    background-color: white;
  }
`;

export const HeaderContent = styled.div`
  padding-top: 16px;
`;

export const ChartsContainer = styled(Content)`
  flex: 1;
  height: 100%;
  background-color: #8d8d8d;
`;
