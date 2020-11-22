import styled from 'styled-components';
import { Layout } from 'antd';

const { Content: LayoutContent } = Layout;

export const Container = styled.div`
  width: 100%;
  .background-white {
    background-color: white;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
`;

export const TableContent = styled(LayoutContent)`
  width: 100%;
`;
