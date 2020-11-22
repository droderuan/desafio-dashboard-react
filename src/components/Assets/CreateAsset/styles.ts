import styled from 'styled-components';
import { Layout as AntLayout } from 'antd';

const { Sider: SiderLayout, Content: ContentLayout } = AntLayout;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Layout = styled(AntLayout)``;

export const Sider = styled(SiderLayout)`
  display: flex;
  align-items: center;
`;

export const Content = styled(ContentLayout)`
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`;

export const FormWrapper = styled.div`
  min-width: 50%;
`;

export const SiderStatistics = styled.div`
  display: flex;
  flex-direction: column;
`;
