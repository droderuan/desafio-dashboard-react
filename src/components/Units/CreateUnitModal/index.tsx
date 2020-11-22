import React, { useCallback } from 'react';
import { Modal, Form, Input } from 'antd';

interface Values {
  name: string;
}

interface AddUnitFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  closeModal: () => void;
}

const AddUnitModal: React.FC<AddUnitFormProps> = ({
  visible,
  onCreate,
  closeModal,
}) => {
  const [form] = Form.useForm();

  const handleSubmitForm = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();

        onCreate(values as Values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }, [form, onCreate]);

  return (
    <Modal
      visible={visible}
      title="Adicionar uma Unidade nova"
      okText="Adicionar"
      cancelText="Cancelar"
      onCancel={closeModal}
      onOk={handleSubmitForm}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="name"
          label="Nome da unidade"
          rules={[
            {
              required: true,
              message: 'Digite o nome da unidade',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUnitModal;
