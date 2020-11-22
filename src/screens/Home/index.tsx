import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Layout, Menu, Typography, Button, Empty } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

import api from '../../services/api';

import createNotification from '../../utils/CreateNotification';

import {
  ICreateCompanyDTO,
  ICreateCompanyResponseDTO,
} from '../../dtos/ICreateCompany';

import Loading from '../../components/Loading';
import AddCompanyModal from '../../components/Company/AddCompanyModal';
import ContentRoutes from '../../routes/ContentRoutes';

import {
  MainLayout,
  Logo,
  AsideAddButtonContainer,
  Content,
  ContentContainer,
  EmptyContainer,
} from './styles';

interface Company {
  _id: string;
  name: string;
  units: { name: string; countAssets: string }[];
}

const Home: React.FC = () => {
  const { Sider } = Layout;
  const { Title } = Typography;

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const history = useHistory();

  const fetchCompanies = useCallback(() => {
    setLoading(true);
    api
      .get('/companies/dashboard/all')
      .then(response => {
        setCompanies(response.data.companies);

        if (response.data.companies.length >= 1) {
          history.push(`/company/${response.data.companies[0]._id}`);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [history]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const toggleModal = useCallback(() => setVisible(old => !old), []);

  const handleAddCompany = useCallback(
    async (values: ICreateCompanyDTO) => {
      api
        .post<ICreateCompanyResponseDTO>('/company', { name: values.name })
        .then(response => {
          createNotification({
            key: 'added',
            type: 'sucess',
            message: `A empresa ${response.data.name} foi adicionada com sucesso!`,
          });
          fetchCompanies();
        })
        .catch(error => {
          if (error.response.status === 400) {
            createNotification({
              key: 'error',
              type: 'error',
              message: `Nome já usado, tente outro!`,
              duration: 2,
            });
          }
        })
        .finally(() => toggleModal());
    },
    [fetchCompanies, toggleModal],
  );

  return (
    <>
      <MainLayout>
        <Sider theme="light">
          <Logo>
            <Title level={3}>Tractian</Title>
          </Logo>
          {loading ? (
            <Loading size="small" />
          ) : (
            <>
              <AsideAddButtonContainer>
                <Title level={4}>Empresas</Title>
                <Button
                  type="text"
                  icon={<PlusSquareOutlined style={{ fontSize: '22px' }} />}
                  onClick={toggleModal}
                />
              </AsideAddButtonContainer>

              <Menu
                theme="light"
                defaultSelectedKeys={companies[0] && [companies[0]._id]}
              >
                {companies.map(company => (
                  <Menu.Item key={company._id}>
                    <Link to={`/company/${company._id}`}>{company.name}</Link>
                  </Menu.Item>
                ))}
              </Menu>
            </>
          )}

          <AddCompanyModal
            visible={visible}
            onCreate={handleAddCompany}
            closeModal={() => setVisible(false)}
          />
        </Sider>

        <Layout style={{ display: 'flex' }}>
          <Content className="background-content">
            <ContentContainer>
              {loading ? (
                <Loading size="large" />
              ) : companies.length >= 1 ? (
                <ContentRoutes />
              ) : (
                <EmptyContainer>
                  <Empty description="Parece que não há nenhuma empresa cadastrada" />
                </EmptyContainer>
              )}
            </ContentContainer>
          </Content>
        </Layout>
      </MainLayout>
    </>
  );
};

export default Home;
