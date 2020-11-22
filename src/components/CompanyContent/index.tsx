import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Tabs, Button, PageHeader } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useCompany } from '../../hooks/Company';
import api from '../../services/api';

import createNotification from '../../utils/CreateNotification';

import { IEditCompanyResponseDTO } from '../../dtos/IEditCompany';

import EditModal from '../Company/EditCompanyModal';
import Loading from '../Loading';
import Assets from '../Assets/Assets';
import Dashboard from '../Dashboard/Dashboard';
import Units from '../Units/Units';
import Users from '../Users/Users';

import { Container, CardContainer, NavTabs, TabContent } from './styles';

interface RouteParams {
  companyId: string;
}

const CompanyContent: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const { TabPane } = Tabs;
  const { companyId } = useParams<RouteParams>();
  const history = useHistory();

  const { fetchCompany, company, loading } = useCompany();

  useEffect(() => {
    fetchCompany(companyId);
  }, [fetchCompany, companyId]);

  const toggleModal = useCallback(() => setEditModalVisible(old => !old), []);

  const handleEditCompany = useCallback(
    ({ name }: IEditCompanyResponseDTO): Promise<void> => {
      return api
        .put(`/company/${companyId}`, { name })
        .then(() => {
          fetchCompany(companyId);
        })
        .catch(() => {
          createNotification({
            key: 'Error on edit company',
            message:
              'Ocorreu um error ao tentar editar. Por favor tente novamente',
            type: 'error',
          });
        })
        .finally(() => toggleModal());
    },
    [companyId, fetchCompany, toggleModal],
  );

  const handleDeleteCompany = useCallback(() => {
    api.delete(`/company/${companyId}`).then(() => {
      history.push('/');
    });
  }, [companyId, history]);

  return loading ? (
    <Loading size="default" />
  ) : (
    <Container>
      <CardContainer>
        <PageHeader
          title={company.name}
          subTitle="Painel de visualização dos dados"
        />
        <NavTabs
          type="card"
          activeKey={activeTab}
          onChange={activeKey => setActiveTab(activeKey)}
          tabBarExtraContent={{
            right: (
              <Button onClick={toggleModal} icon={<EditOutlined />}>
                Editar Empresa
              </Button>
            ),
          }}
        >
          <TabPane tab="Dashboard" key="1">
            <Dashboard />
          </TabPane>
          <TabPane tab="Unidades" key="2">
            <Units />
          </TabPane>
          <TabPane tab="Ativos" key="3">
            <TabContent>
              <Assets />
            </TabContent>
          </TabPane>
          <TabPane tab="Responsáveis" key="4">
            <Users />
          </TabPane>
        </NavTabs>
      </CardContainer>

      <EditModal
        visible={editModalVisible}
        onEdit={handleEditCompany}
        closeModal={toggleModal}
        onDelete={handleDeleteCompany}
      />
    </Container>
  );
};

export default CompanyContent;
