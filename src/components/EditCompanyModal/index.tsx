import React, { useCallback } from 'react';
import { Modal, Form, Input, Button, Popconfirm } from 'antd';
import { useCompany } from '../../hooks/Company';

import { HeaderModal } from './styles';

interface Values {
  name: string;
}

interface EditCompanyFormProps {
  visible: boolean;
  onEdit: (values: Values) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const EditCompanyModal: React.FC<EditCompanyFormProps> = ({
  visible,
  onEdit,
  onCancel,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const { company } = useCompany();

  const handleDeleteCompany = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <Modal
      visible={visible}
      title="Adicionar uma nova empresa"
      okText="Editar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onEdit(values as Values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <HeaderModal>
        <Popconfirm
          title="Apagar"
          okText="Sim"
          cancelText="Não"
          onConfirm={handleDeleteCompany}
        >
          <Button danger type="primary">
            Apagar
          </Button>
        </Popconfirm>
      </HeaderModal>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome da empresa"
          initialValue={company.name}
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

export default EditCompanyModal;
