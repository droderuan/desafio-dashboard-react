import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

interface Values {
  name: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const AddCompanyModal: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Adicionar uma nova empresa"
      okText="Adicionar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values as Values);
            onCancel();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome da empresa"
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

export default AddCompanyModal;
