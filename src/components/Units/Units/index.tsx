import React, { useCallback, useState } from 'react';
import { Layout, Menu, Typography, Button } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import { useCompany } from '../../../hooks/Company';
import createNotification from '../../../utils/CreateNotification';

import { ICreateUnitDTO } from '../../../dtos/ICreateUnit';

import CreateUnitModal from '../CreateUnitModal';

import { Container, SiderHeader, AsideAddButton, UnitContent } from './styles';

const Dashboard: React.FC = () => {
  const { Sider } = Layout;
  const { SubMenu } = Menu;
  const { Title } = Typography;
  const { company, fetchCompany } = useCompany();

  const [createUnitModalVisible, setUnitModalVisibleVisible] = useState(false);
  const [whichContent, setWhichContent] = useState<'assets' | 'info'>('assets');

  const toggleModal = useCallback(
    () => setUnitModalVisibleVisible(old => !old),
    [],
  );

  const handleCreateUnit = useCallback(
    (values: ICreateUnitDTO) => {
      api
        .post(`/company/${company._id}/units`, { ...values })
        .then(() => {
          createNotification({
            key: 'ctreated unit',
            message: `Unidade criada com sucesso.`,
            type: 'sucess',
          });

          fetchCompany(company._id);
        })
        .catch(error => {
          console.log(error);
          createNotification({
            key: 'error on edit user',
            message: `Ocorreu um error ao tentar criar a unidade. Por favor, tente novamente.`,
            type: 'error',
          });
        })
        .finally(() => toggleModal());
    },
    [toggleModal, company._id, fetchCompany],
  );

  const handleContent = useCallback((value: 'assets' | 'info') => {
    setWhichContent(value);
  }, []);

  return (
    <Container>
      <Layout className="background-white">
        <Sider theme="light">
          <SiderHeader theme="light">
            <Title level={4}>Todas as unidades</Title>
          </SiderHeader>

          <AsideAddButton>
            <Button
              type="text"
              icon={<PlusSquareOutlined size={150} onClick={toggleModal} />}
            />
          </AsideAddButton>

          <Menu theme="light" mode="inline">
            {company.units.map(unit => (
              <SubMenu key={`sub${unit._id}`} title={unit.name}>
                <Menu.Item
                  key={`1-${unit._id}`}
                  onClick={() => handleContent('info')}
                >
                  Dados
                </Menu.Item>
                <Menu.Item
                  key={`2-${unit._id}`}
                  onClick={() => handleContent('assets')}
                >
                  Ativos
                </Menu.Item>
              </SubMenu>
            ))}
          </Menu>
          <CreateUnitModal
            visible={createUnitModalVisible}
            onCreate={handleCreateUnit}
            closeModal={toggleModal}
          />
        </Sider>
        <UnitContent>
          {whichContent === 'info' && <h1>info</h1>}
          {whichContent === 'assets' && <h1>assets</h1>}
        </UnitContent>
      </Layout>
    </Container>
  );
};

export default Dashboard;
