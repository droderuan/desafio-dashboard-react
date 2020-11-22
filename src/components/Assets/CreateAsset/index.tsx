import React, { useCallback, useState } from 'react';
import { PageHeader, Form, Input, Select, Button } from 'antd';
import { useCompany } from '../../../hooks/Company';
import api from '../../../services/api';
import createNotification from '../../../utils/CreateNotification';

import ICreateAsset from '../../../dtos/ICreateAsset';

import { Content, FormWrapper } from './styles';

interface CreateAssetProps {
  back: () => void;
}

const CreateAsset: React.FC<CreateAssetProps> = ({ back }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { TextArea } = Input;
  const { Option } = Select;

  const { company, fetchCompany } = useCompany();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const handleSubmitForm = useCallback(() => {
    setLoading(true);
    form
      .validateFields()
      .then(values => {
        api
          .post(`/company/${company._id}/assets`, {
            ...values,
            description: values.description || ' ',
            healthscore: 100,
          } as ICreateAsset)
          .then(() => {
            createNotification({
              key: 'ctreated unit',
              message: `Unidade criada com sucesso.`,
              type: 'sucess',
            });

            fetchCompany(company._id);
            form.resetFields();
            back();
          })
          .catch(error => {
            console.log(error);
            createNotification({
              key: 'error on edit user',
              message: `Ocorreu um error ao tentar criar a unidade. Por favor, tente novamente.`,
              type: 'error',
            });
          })
          .finally(() => setLoading(false));
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }, [company._id, form, fetchCompany, back]);

  return (
    <>
      <PageHeader title="Criar um Ativo" onBack={back} />
      <Content>
        <FormWrapper>
          <Form
            {...layout}
            form={form}
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="Nome do Ativo"
              name="name"
              rules={[{ required: true, message: 'Por favor digite um nome!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tipo"
              name="type"
              rules={[{ required: true, message: 'Por favor digite o tipo!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Modelo do equipamento"
              name="modelName"
              rules={[
                { required: true, message: 'Por favor digite o modelo!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Descrição" name="description">
              <TextArea showCount maxLength={100} defaultValue="" />
            </Form.Item>

            <Form.Item
              label="Estado atual"
              name="state"
              rules={[
                {
                  required: true,

                  message: 'Por favor selecione o estado atual!',
                },
              ]}
            >
              <Select placeholder="Selecione o estado do ativo">
                <Option value="Disponível">Disponível</Option>
                <Option value="Em manutenção">Em manutenção</Option>
                <Option value="Desativado">Desativado</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Unidade"
              name="unitId"
              rules={[
                {
                  required: true,
                  message: 'Por favor crie uma unidade antes!',
                },
              ]}
            >
              <Select placeholder="Selecione a unidade">
                {company.units.map(eachUnit => (
                  <Option value={eachUnit._id}>{eachUnit.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Responsável" name="responsibleId">
              <Select placeholder="Selecione o responsável">
                {company.employeers.map(employeer => (
                  <Option value={employeer._id}>{employeer.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmitForm}
                loading={loading}
              >
                Criar
              </Button>
            </Form.Item>
          </Form>
        </FormWrapper>
      </Content>
    </>
  );
};

export default CreateAsset;
