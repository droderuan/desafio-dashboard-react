import styled from 'styled-components';
import { Layout } from 'antd';

const { Content: AntContent } = Layout;

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
`;

export const ContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;

  background-color: white;
  border-radius: 10px;
`;
