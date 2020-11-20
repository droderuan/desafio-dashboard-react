import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Layout } from 'antd';

import Dashboard from '../Dashboard';
import Units from '../Units';

import { Container, CardContainer, NavTabs, TabContent } from './styles';

interface RouteParams {
  companyId: string;
}

const CompanyContent: React.FC = () => {
  const { TabPane } = Tabs;
  const { companyId } = useParams<RouteParams>();

  return (
    <Container>
      <CardContainer>
        <h1>
          Id da empresa:
          {companyId}
        </h1>
        <NavTabs type="card">
          <TabPane tab="dashboard" key="1" style={{ height: '100%' }}>
            <Dashboard />
          </TabPane>
          <TabPane tab="unidades" key="2">
            <Units />
          </TabPane>
          <TabPane tab="responsaveis" key="3">
            Responsáveis
          </TabPane>
          <TabPane tab="Editar" key="4">
            Editar
          </TabPane>
        </NavTabs>
      </CardContainer>
    </Container>
  );
};

export default CompanyContent;
