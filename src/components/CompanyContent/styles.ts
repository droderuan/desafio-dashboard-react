import styled from 'styled-components';

import { Layout, Tabs } from 'antd';

const { Content } = Layout;

export const Container = styled(Content)`
  flex: 1;
`;

export const CardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const NavTabs = styled(Tabs)`
  flex: 1;
  border-radius: 10px;
`;

export const TabContent = styled.div`
  flex: 1;
`;
