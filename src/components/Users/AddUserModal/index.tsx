import React, { useCallback } from 'react';
import { Modal, Form, Input } from 'antd';

interface Values {
  name: string;
  email: string;
}

interface AddUserFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  closeModal: () => void;
}

const AddUserModal: React.FC<AddUserFormProps> = ({
  visible,
  onCreate,
  closeModal,
}) => {
  const [form] = Form.useForm();

  const handleSubmitForm = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        onCreate(values as Values);
        form.resetFields();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }, [form, onCreate]);

  return (
    <Modal
      visible={visible}
      title="Adicionar novo responsável"
      okText="Adicionar"
      cancelText="Cancelar"
      onCancel={closeModal}
      onOk={handleSubmitForm}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: 'Digite o nome',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Digite o email',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
