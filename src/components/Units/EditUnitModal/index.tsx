import React, { useCallback, useMemo } from 'react';
import { Modal, Form, Input, Button, Popconfirm } from 'antd';
import { useCompany } from '../../../hooks/Company';

import { HeaderModal } from './styles';

interface Values {
  name: string;
}

interface EditUnitFormProps {
  visible: boolean;
  unitId: string;
  onEdit: (values: Values) => void;
  closeModal: () => void;
  onDelete: () => void;
}

const EditUnitModal: React.FC<EditUnitFormProps> = ({
  visible,
  unitId,
  onEdit,
  closeModal,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const { company } = useCompany();

  const unit = useMemo(() => {
    const findUnit = company.units.find(
      unitToCheck => unitToCheck._id === unitId,
    );

    if (!findUnit) throw new Error('Unit does not exist');

    return findUnit;
  }, [company.units, unitId]);

  const handleDeleteUnit = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const handleSubmitForm = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        onEdit(values as Values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }, [form, onEdit]);

  return (
    <Modal
      visible={visible}
      title="Editar nome da empresa"
      okText="Editar"
      cancelText="Cancelar"
      onCancel={closeModal}
      onOk={handleSubmitForm}
    >
      <HeaderModal>
        <Popconfirm
          title="Tem certeza que deseja apagar?"
          okText="Sim"
          cancelText="Não"
          onConfirm={handleDeleteUnit}
        >
          <Button danger type="primary">
            Apagar
          </Button>
        </Popconfirm>
      </HeaderModal>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome da unidade"
          initialValue={unit.name}
          rules={[
            {
              required: true,
              message: 'Digite o nome da empresa',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUnitModal;
