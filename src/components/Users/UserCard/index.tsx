import React, { useCallback, useState } from 'react';
import { Popconfirm, Empty } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import api from '../../../services/api';
import createNotification from '../../../utils/CreateNotification';
import { useCompany } from '../../../hooks/Company';

import { IEditUserDTO } from '../../../dtos/IEditUser';

import EditUserModal from '../EditUserModal';

import { CardContainer } from './styles';

interface User {
  _id: string;
  name: string;
  email: string;
  assets: {
    _id: string;
    name: string;
    avgDreacreasehealthScore: number;
    nextMaintanceDate: string;
  }[];
}
interface IUserCardProps {
  user: User;
  createCard?: boolean;
}

const UserCard: React.FC<IUserCardProps> = ({ user }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { company, fetchCompany } = useCompany();

  const toggleModal = useCallback(() => setEditModalVisible(old => !old), []);

  const handleEditUser = useCallback(
    (values: IEditUserDTO) => {
      api
        .put(`/company/${company._id}/users/${user._id}`, {
          name: values.name,
          email: values.email,
        })
        .then(() => {
          createNotification({
            key: 'updated user',
            message: `Responsável editado.`,
            type: 'sucess',
          });

          fetchCompany(company._id);
        })
        .catch(() => {
          createNotification({
            key: 'error on edit user',
            message: `Ocorreu um error ao tentar editar. Por favor, tente novamente.`,
            type: 'error',
          });
        })
        .finally(() => toggleModal());
    },
    [company._id, user._id, fetchCompany, toggleModal],
  );

  const handleDeleteUser = useCallback(() => {
    api
      .delete(`/company/${company._id}/users/${user._id}`)
      .then(() => {
        createNotification({
          key: 'user deleted',
          message: `Responsável ${user.name} deletado(a).`,
          type: 'sucess',
        });

        fetchCompany(company._id);
      })
      .catch(() => {
        createNotification({
          key: 'error on delete user',
          message: `Ocorreu um error ao tentar deletar. Por favor, tente novamente.`,
          type: 'error',
        });
      });
  }, [company._id, fetchCompany, user._id, user.name]);

  return (
    <CardContainer
      title={user.name}
      actions={[
        <EditOutlined onClick={toggleModal} />,
        <Popconfirm
          title="Tem certeza?"
          okText="Sim"
          cancelText="Não"
          onConfirm={handleDeleteUser}
        >
          <DeleteOutlined />
        </Popconfirm>,
      ]}
      hoverable
    >
      {user.assets.length > 0 ? (
        user.assets.map(asset => <p>{asset.name}</p>)
      ) : (
        <Empty description="Responsável por nenhum ativo" />
      )}

      <EditUserModal
        user={user}
        visible={editModalVisible}
        onEdit={handleEditUser}
        closeModal={toggleModal}
      />
    </CardContainer>
  );
};

export default UserCard;
