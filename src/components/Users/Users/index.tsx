import React, { useCallback, useMemo, useState } from 'react';
import { PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCompany } from '../../../hooks/Company';
import api from '../../../services/api';

import createNotification from '../../../utils/CreateNotification';

import { ICreateUserDTO } from '../../../dtos/ICreateUser';

import UserCard from '../UserCard';
import AddUserModal from '../AddUserModal';

import { Container, Grid, GridItem } from './styles';

const Users: React.FC = () => {
  const { company, fetchCompany } = useCompany();

  const [addUserModalVisible, setAddUserModalVisible] = useState(false);

  const toggleModal = useCallback(
    () => setAddUserModalVisible(old => !old),
    [],
  );

  const handleCreateUser = useCallback(
    (values: ICreateUserDTO) => {
      api
        .post(`/company/${company._id}/users`, {
          name: values.name,
          email: values.email,
        })
        .then(() => {
          createNotification({
            key: 'created user',
            message: `${values.name} adicionado(a).`,
            type: 'sucess',
          });

          fetchCompany(company._id);
        })
        .catch(() => {
          createNotification({
            key: 'error on create user',
            message: `Ocorreu um erro ao tentar adicionar. Por favor, tente novamente.`,
            type: 'error',
          });
        })
        .finally(() => toggleModal());
    },
    [company._id, fetchCompany, toggleModal],
  );

  const parsedEmployeers = useMemo(() => {
    const parsed = company.employeers.map(employeer => {
      return {
        _id: employeer._id,
        name: employeer.name,
        email: employeer.email,
        assets: [...employeer.responsibleAssets],
      };
    });
    return parsed;
  }, [company.employeers]);

  return (
    <Container>
      <PageHeader
        title="Todos os Responsáveis"
        extra={[
          <Button type="primary" icon={<PlusOutlined />} onClick={toggleModal}>
            Adicionar responsável
          </Button>,
        ]}
      />
      <AddUserModal
        visible={addUserModalVisible}
        onCreate={handleCreateUser}
        closeModal={toggleModal}
      />
      <Grid>
        {parsedEmployeers.map(employeer => (
          <GridItem>
            <UserCard user={employeer} />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};

export default Users;
