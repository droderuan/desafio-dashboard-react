import styled from 'styled-components';
import { Layout } from 'antd';
import { cyan } from '@ant-design/colors';

const { Content: AntContent } = Layout;

export const MainLayout = styled(Layout)`
  min-height: 100vh;
  display: flex;
`;

export const Logo = styled.div`
  height: 32px;
  margin: 16px;
`;

export const AsideAddButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 0 16px;
`;

export const Content = styled(AntContent)`
  flex: 1;
  height: 100vh;
  padding: 32px;

  background-color: ${cyan[4]};
`;

export const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;

  background-color: white;
  border-radius: 10px;
`;

export const EmptyContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
