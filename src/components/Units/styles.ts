import styled from 'styled-components';

export const Container = styled.div`
  border-radius: 4px;
  min-height: 100%;

  .background-white {
    background-color: white;
  }
`;

export const HeaderContent = styled.div`
  padding-top: 16px;
`;

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
