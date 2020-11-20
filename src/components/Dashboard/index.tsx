import React, { useState } from 'react';
import { Layout, Menu, Typography, Button, Empty } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import { Container, HeaderContent, ChartsContainer } from './styles';

const Dashboard: React.FC = () => {
  const { Sider, Header, Content } = Layout;
  const { Title } = Typography;

  return (
    <Container>
      <ChartsContainer>
        <Header>
          <HeaderContent />
        </Header>

        <ChartsContainer>Teste</ChartsContainer>
      </ChartsContainer>
    </Container>
  );
};

export default Dashboard;
