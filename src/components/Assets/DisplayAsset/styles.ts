import styled from 'styled-components';
import { Layout as AntLayout, Image } from 'antd';

const { Sider: SiderLayout, Content: ContentLayout } = AntLayout;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ImageSkeleton = styled(Image)`
  width: 350px;
  height: 350px;
  object-fit: cover;
  margin-right: 16px;
`;

export const ImagePlaceholder = styled.img`
  width: 350px;
  height: 350px;
  object-fit: cover;
`;

export const Layout = styled(AntLayout)``;

export const Sider = styled(SiderLayout)`
  display: flex;
  align-items: center;
`;

export const Content = styled(ContentLayout)`
  display: flex;
  justify-content: space-around;
`;

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const FormWrapper = styled.div`
  min-width: 50%;
  width: 50%;
`;

export const SiderStatistics = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SelectResponsibleWrapper = styled.div`
  width: 50%;
`;
