import styled from 'styled-components';
import { Layout, Image, List } from 'antd';

const { Content: LayoutContent, Header: LayoutHeader } = Layout;

export const Container = styled(Layout)`
  height: 100%;
`;

export const Header = styled(LayoutHeader)``;

export const Content = styled(LayoutContent)`
  height: 100%;
`;

export const ImageSkeleton = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 16px;
`;

export const ImagePlaceholder = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

export const ListItem = styled(List.Item)`
  display: flex;
  justify-content: start;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 32px;
`;

export const ListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListItemInfoHeader = styled.div`
  display: flex;
`;

export const ListInfoContent = styled.div`
  display: flex;
  flex-direction: row;
`;
