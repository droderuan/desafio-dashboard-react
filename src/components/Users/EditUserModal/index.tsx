import React, { useCallback } from 'react';
import { Modal, Form, Input } from 'antd';

interface Values {
  name: string;
  email: string;
}

interface EditUserFormProps {
  visible: boolean;
  user: { _id: string; name: string; email: string };
  onEdit: (values: Values) => void;
  closeModal: () => void;
}

const EditUserModal: React.FC<EditUserFormProps> = ({
  visible,
  user,
  onEdit,
  closeModal,
}) => {
  const [form] = Form.useForm();

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
      title={`Editar o(a) responsável ${user.name}`}
      okText="Confirmar"
      cancelText="Cancelar"
      onCancel={closeModal}
      onOk={handleSubmitForm}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome"
          initialValue={user.name}
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
          initialValue={user.email}
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

export default EditUserModal;
