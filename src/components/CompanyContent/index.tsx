import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import { useCompany } from '../../hooks/Company';
import api from '../../services/api';

import createNotification from '../../utils/CreateNotification';

import { IEditCompanyResponseDTO } from '../../dtos/IEditCompany';

import EditModal from '../EditCompanyModal';
import Loading from '../Loading';
import Dashboard from '../Dashboard';
import Units from '../Units';

import { Container, CardContainer, NavTabs } from './styles';

interface RouteParams {
  companyId: string;
}

const CompanyContent: React.FC = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);

  const { TabPane } = Tabs;
  const { companyId } = useParams<RouteParams>();
  const history = useHistory();

  const { fetchCompany, company, loading } = useCompany();

  useEffect(() => {
    fetchCompany(companyId);
  }, [fetchCompany, companyId]);

  const toggleModal = useCallback(() => setEditModalVisible(old => !old), []);

  const handleEditCompany = useCallback(
    ({ name }: IEditCompanyResponseDTO) => {
      api
        .put(`/company/${companyId}`, { name })
        .then(() => {
          fetchCompany(companyId);
        })
        .catch(error => {
          createNotification({
            key: 'Error on edit company',
            message:
              'Ocorreu um error ao tentar editar. Por favor tente novamente',
            type: 'error',
          });
        });
    },
    [companyId, fetchCompany],
  );

  const handleDeleteCompany = useCallback(() => {
    api.delete(`/company/${companyId}`).then(() => {
      history.push('/');
    });
  }, [companyId, history]);

  return loading ? (
    <Loading size={58} />
  ) : (
    <Container>
      <CardContainer>
        <h1>
          Id da empresa:
          {company._id}
        </h1>
        <NavTabs
          type="card"
          tabBarExtraContent={{
            right: <Button onClick={toggleModal}>Editar Empresa</Button>,
          }}
        >
          <TabPane tab="Dashboard" key="1" style={{ height: '100%' }}>
            <Dashboard />
          </TabPane>
          <TabPane tab="Unidades" key="2">
            <Units />
          </TabPane>
          <TabPane tab="Responsáveis" key="3">
            Responsáveis
          </TabPane>
        </NavTabs>
      </CardContainer>

      <EditModal
        visible={editModalVisible}
        onEdit={handleEditCompany}
        onCancel={toggleModal}
        onDelete={handleDeleteCompany}
      />
    </Container>
  );
};

export default CompanyContent;
