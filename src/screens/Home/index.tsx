import React, { useCallback, useEffect, useState } from 'react';
import { Layout, Menu, Typography, Button, Empty, notification } from 'antd';
import { PlusSquareOutlined, LoadingOutlined } from '@ant-design/icons';
import { useHistory, useRouteMatch } from 'react-router-dom';

import api from '../../services/api';

import createNotification from '../../utils/CreateNotification';

import {
  ICreateCompanyDTO,
  ICreateCompanyResponseDTO,
} from '../../dtos/ICreateCompany';

import AddCompanyModal from '../../components/AddCompanyModal';

import ContentRoutes from '../../routes/ContentRoutes';

import {
  Logo,
  AsideAddButtonContainer,
  Content,
  ContentContainer,
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
  const { url } = useRouteMatch();

  useEffect(() => {
    setLoading(true);
    api.get('/companies/dashboard/all').then(response => {
      setCompanies(response.data.companies);
      setLoading(false);
    });
  }, []);

  const toggleModal = useCallback(() => setVisible(old => !old), []);

  const handleAddCompany = useCallback(async (values: ICreateCompanyDTO) => {
    try {
      api
        .post<ICreateCompanyResponseDTO>('/company', { name: values.name })
        .then(response => {
          createNotification({
            key: 'added',
            type: 'sucess',
            message: `A empresa ${response.data.name} foi adicionada com sucesso!`,
          });
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
        });
    } catch (err) {
      notification.open({
        key: '',
        message: `Não foi possível adicionar uma empresa nova. Verifique a conexão e tente novamente.`,
        placement: 'bottomLeft',
        duration: 2,
      });
    }
  }, []);

  return (
    <>
      <Layout style={{ minHeight: '100vh', display: 'flex' }}>
        <Sider theme="light">
          <Logo>
            <Title level={3}>Tractian</Title>
          </Logo>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingOutlined spin style={{ fontSize: '32px' }} />
            </div>
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

              <Menu theme="light">
                {companies.map(company => (
                  <Menu.Item
                    key={company._id}
                    onClick={() => {
                      history.push(`/company/${company._id}`);
                    }}
                  >
                    {company.name}
                  </Menu.Item>
                ))}
              </Menu>
            </>
          )}

          <AddCompanyModal
            visible={visible}
            onCreate={handleAddCompany}
            onCancel={() => setVisible(false)}
          />
        </Sider>

        <Layout style={{ display: 'flex' }}>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <LoadingOutlined spin style={{ fontSize: '56px' }} />
            </div>
          ) : companies.length >= 1 ? (
            <Content>
              <ContentContainer>
                <ContentRoutes />
              </ContentContainer>
            </Content>
          ) : (
            <Empty />
          )}
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
