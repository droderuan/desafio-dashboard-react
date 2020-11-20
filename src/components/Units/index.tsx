import React from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import {
  Container,
  HeaderContent,
  SiderHeader,
  AsideAddButton,
} from './styles';

const Dashboard: React.FC = () => {
  const { Sider, Header, Content } = Layout;
  const { SubMenu } = Menu;
  const { Title } = Typography;

  return (
    <Container>
      <Layout className="background-white">
        <Header>
          <HeaderContent />
        </Header>

        <Layout className="background-white">
          <Sider theme="light">
            <SiderHeader theme="light">
              <Title level={4}>Unidade selecionada</Title>
            </SiderHeader>

            <AsideAddButton>
              <Button type="text" icon={<PlusSquareOutlined size={150} />} />
            </AsideAddButton>

            <Menu theme="light">
              <Menu.Item key="1">Opção 1</Menu.Item>
            </Menu>
          </Sider>
          <Content>Teste</Content>
        </Layout>
      </Layout>
    </Container>
  );
};

export default Dashboard;
