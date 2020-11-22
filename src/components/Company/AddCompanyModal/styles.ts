import styled from 'styled-components';
import { Layout } from 'antd';

const { Content: AntContent } = Layout;

export const Content = styled(AntContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
