import styled from 'styled-components';
import { Layout } from 'antd';

const { Content } = Layout;

export const Container = styled.div`
  border-radius: 4px;
  min-height: 100%;
`;

export const HeaderContent = styled.div``;

export const SiderHeader = styled.div`
  height: 32px;
  margin: 16px;
`;

export const AsideAddButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 16px;
`;

export const CardContainer = styled.div`
  padding: 16px;

  .ant-tabs-content {
    margin-top: -16px;
  }
`;

export const UnitContent = styled(Content)`
  flex: 1;
`;
