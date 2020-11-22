import React, { useCallback, useMemo, useState } from 'react';
import { Statistic, PageHeader, Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useCompany } from '../../../hooks/Company';

import { Container, Content, TableContent } from './styles';
import api from '../../../services/api';
import createNotification from '../../../utils/CreateNotification';

import EditUnitModal from '../EditUnitModal';

import { IEditUnitDTO } from '../../../dtos/IEditUnit';

interface UnitDataProps {
  unitId: string;
}

const UnitData: React.FC<UnitDataProps> = ({ unitId }) => {
  const { company, fetchCompany } = useCompany();

  const [editModalVisible, setEditModalVisible] = useState(false);

  const toggleModal = useCallback(() => setEditModalVisible(old => !old), []);

  const unit = useMemo(() => {
    const foundUnit = company.units.find(eachUnit => eachUnit._id === unitId);
    if (!foundUnit) {
      throw new Error('Unit not found');
    }
    return foundUnit;
  }, [unitId, company.units]);

  const totalAssetsCount = useMemo(() => {
    if (unit) {
      return unit.assets.length;
    }
    return null;
  }, [unit]);

  const handleEditUser = useCallback(
    async (values: IEditUnitDTO): Promise<void> => {
      return api
        .put(`/company/${company._id}/units/${unit._id}`, {
          name: values.name,
        })
        .then(() => {
          createNotification({
            key: 'updated unit',
            message: `Unidade atualizada.`,
            type: 'sucess',
          });

          fetchCompany(company._id);
        })
        .catch(() => {
          createNotification({
            key: 'error on edit unit',
            message: `Ocorreu um error ao tentar editar. Por favor, tente novamente.`,
            type: 'error',
          });
        })
        .finally(() => toggleModal());
    },
    [company._id, unit._id, fetchCompany, toggleModal],
  );

  const handleDeleteUser = useCallback(() => {
    api
      .delete(`/company/${company._id}/units/${unit._id}`)
      .then(() => {
        createNotification({
          key: 'unit deleted',
          message: `Unidade ${unit.name} deletada.`,
          type: 'sucess',
        });

        fetchCompany(company._id);
      })
      .catch(() => {
        createNotification({
          key: 'error on delete unit',
          message: `Ocorreu um error ao tentar deletar. Por favor, tente novamente.`,
          type: 'error',
        });
      });
  }, [company._id, fetchCompany, unit._id, unit.name]);

  const parsedAssets = useMemo(
    () =>
      unit?.assets.map(asset => ({
        key: asset._id,
        name: asset.name,
        responsible: asset.responsible
          ? asset.responsible.name
          : 'Sem responsável',
        healthscore: asset.healthscore,
        nextMaintanceDate: asset.nextMaintanceDate,
      })),
    [unit?.assets],
  );

  const tableColumns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Responsável',
      dataIndex: 'responsible',
      key: 'responsible',
    },
    {
      title: 'HealthScore',
      dataIndex: 'healthscore',
      key: 'healthscore',
    },
    {
      title: 'Próxima Manutenção estipulada',
      dataIndex: 'nextMaintanceDate',
      key: 'nextMaintanceDate',
    },
  ];

  return (
    <Container>
      <PageHeader
        title="Visão geral"
        extra={[
          <Button type="primary" onClick={toggleModal} icon={<EditOutlined />}>
            Editar Ativo
          </Button>,
        ]}
      />
      <EditUnitModal
        unit={unit}
        visible={editModalVisible}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        closeModal={toggleModal}
      />
      <Content>
        <Statistic
          title="Total de ativos"
          value={totalAssetsCount || 'Sem ativos no momento'}
        />
        <Statistic
          title="Quantidade de ativos em uso"
          value={unit?.inUse || '0'}
        />
        <Statistic
          title="Quantidade de ativos em alerta"
          value={unit?.onAlert || '0'}
        />
        <Statistic
          title="Quantidade de ativos em estado critíco"
          value={unit?.onCritical || '0'}
        />
      </Content>
      <TableContent>
        <Table
          dataSource={parsedAssets}
          columns={tableColumns}
          pagination={{
            position: ['topCenter'],
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20'],
            showSizeChanger: true,
            defaultCurrent: 1,
            total: parsedAssets.length,
          }}
        />
      </TableContent>
    </Container>
  );
};

export default UnitData;
