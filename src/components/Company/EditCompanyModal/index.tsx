import React, { useCallback, useState } from 'react';
import { Modal, Form, Input, Button, Popconfirm } from 'antd';
import { useCompany } from '../../../hooks/Company';

import { HeaderModal } from './styles';

interface Values {
  name: string;
}

interface EditCompanyFormProps {
  visible: boolean;
  onEdit: (values: Values) => Promise<void>;
  closeModal: () => void;
  onDelete: () => void;
}

const EditCompanyModal: React.FC<EditCompanyFormProps> = ({
  visible,
  onEdit,
  closeModal,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const { company } = useCompany();

  const [loading, setLoading] = useState(false);

  const handleDeleteCompany = useCallback(() => {
    onDelete();
  }, [onDelete]);

  const handleSubmitForm = useCallback(() => {
    setLoading(true);
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        onEdit(values as Values).finally(() => setLoading(false));
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
      okButtonProps={{ loading }}
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
