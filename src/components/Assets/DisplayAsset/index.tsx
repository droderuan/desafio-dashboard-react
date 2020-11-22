import React, { useCallback, useMemo, useState } from 'react';
import {
  PageHeader,
  Statistic,
  Form,
  Input,
  Select,
  Button,
  Upload,
  message,
  Switch,
} from 'antd';
import {
  ArrowDownOutlined,
  HeartOutlined,
  UserOutlined,
  HomeOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useCompany } from '../../../hooks/Company';
import BgPlaceholder from '../../../assets/image-placeholder.png';

import IUpdateAsset from '../../../dtos/IUpdateAsset';

import {
  Container,
  SiderStatistics,
  ImageSkeleton,
  ImagePlaceholder,
  Layout,
  Sider,
  Content,
  FormWrapper,
  ContentHeader,
  SelectResponsibleWrapper,
} from './styles';
import api from '../../../services/api';
import createNotification from '../../../utils/CreateNotification';

interface DisplayAssetsProps {
  assetId: string | undefined;
  back: () => void;
}

const DisplayAsset: React.FC<DisplayAssetsProps> = ({ assetId, back }) => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingResponsible, setIsChangingResponsible] = useState(false);
  const [loading, setLoading] = useState(false);

  const { TextArea } = Input;
  const { Option } = Select;

  const { company, fetchCompany } = useCompany();

  const asset = useMemo(() => {
    const foundUnit = company.units.find(eachUnit => {
      return eachUnit.assets.some(eachAsset => eachAsset._id === assetId);
    });
    if (!foundUnit) {
      throw new Error('asset not found');
    }

    const foundAsset = foundUnit.assets.find(
      eachAsset => eachAsset._id === assetId,
    );
    if (!foundAsset) {
      throw new Error('asset not found');
    }

    return foundAsset;
  }, [assetId, company.units]);

  const [responsibleId, setResponsibleId] = useState('');

  const unit = useMemo(() => {
    const findedUnit = company.units.find(eachUnit => {
      const check = eachUnit.assets.find(
        eachUnitAsset => eachUnitAsset._id === asset._id,
      );

      if (!check) {
        return false;
      }
      return true;
    });
    if (!findedUnit) {
      return null;
    }
    return findedUnit;
  }, [company.units, asset._id]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const uploadProps = useMemo(
    () => ({
      name: 'image',
      action: `${api.defaults.baseURL}company/${company._id}/assets/${asset._id}/image`,
      onChange(info: any) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`Imagem carregada com sucesso!`);
          fetchCompany(company._id);
        } else if (info.file.status === 'error') {
          message.error(`Falha ao tentar carregar a imagem.`);
        }
      },
    }),
    [asset._id, company._id, fetchCompany],
  );

  const handleSubmitForm = useCallback(() => {
    setLoading(true);
    form
      .validateFields()
      .then(values => {
        api
          .put(`/company/${company._id}/assets/${asset._id}`, {
            ...values,
            description: values.description || ' ',
            healthscore: 100,
          } as IUpdateAsset)
          .then(() => {
            createNotification({
              key: 'update asset',
              message: `Ativo atualizado com sucesso.`,
              type: 'sucess',
            });

            fetchCompany(company._id);
            form.resetFields();
            back();
          })
          .catch(error => {
            createNotification({
              key: 'error on update asset',
              message: `Ocorreu um error ao tentar atualizar o ativo. Por favor, tente novamente.`,
              type: 'error',
            });
          })
          .finally(() => setLoading(false));
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }, [company._id, form, fetchCompany, back, asset._id]);

  const handleChangeResponsible = useCallback(() => {
    setLoading(true);
    api
      .patch(`/company/${company._id}/assets/${asset._id}/responsible`, {
        responsibleId,
      } as IUpdateAsset)
      .then(() => {
        createNotification({
          key: 'change responsible',
          message: `Responsável atualizado.`,
          type: 'sucess',
        });

        fetchCompany(company._id);
        form.resetFields();
        back();
      })
      .catch(error => {
        console.log(error);
        createNotification({
          key: 'error on change responsible',
          message: `Ocorreu um error ao tentar mudar o responsável. Por favor, tente novamente.`,
          type: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [company._id, form, fetchCompany, back, asset._id, responsibleId]);

  return (
    <Container>
      <PageHeader title={asset.name} onBack={back} />
      <Layout className="background-white">
        <Sider>
          <SiderStatistics>
            <Statistic
              title="Healthscore"
              value={asset.healthscore}
              prefix={<HeartOutlined />}
            />
            <Statistic
              title="Diminuição Média do Healthscore"
              value={asset.avgDecreaseHealthScore}
              prefix={<ArrowDownOutlined />}
              suffix="/mês"
            />
            <Statistic
              title="Responsável"
              value={
                asset.responsible ? asset.responsible.name : 'Sem responsável'
              }
              prefix={<UserOutlined />}
            />
            <Statistic
              title="Unidade"
              value={unit ? unit.name : 'Sem unidade definida'}
              prefix={<HomeOutlined />}
            />
            <Statistic
              title="Próxima manutenção estipulada"
              value={
                asset.nextMaintanceDate
                  ? asset.nextMaintanceDate
                  : 'Dados insuficientes'
              }
            />
          </SiderStatistics>
        </Sider>
        <Layout className="background-white">
          <Content>
            <ImageSkeleton
              src={asset.image.url}
              placeholder={<ImagePlaceholder src={BgPlaceholder} alt="" />}
            />
            <FormWrapper>
              <ContentHeader>
                <Switch
                  checkedChildren="Editando"
                  unCheckedChildren="Editar"
                  onChange={() => setIsEditing(old => !old)}
                  style={{ marginRight: '16px' }}
                  disabled={isChangingResponsible}
                />
                <Switch
                  checkedChildren="Alterando responsável"
                  unCheckedChildren="Alterar responsável"
                  onChange={() => setIsChangingResponsible(old => !old)}
                  disabled={isEditing}
                />
              </ContentHeader>
              {isChangingResponsible ? (
                <SelectResponsibleWrapper>
                  <Form
                    layout="vertical"
                    initialValues={{ ...asset.responsible }}
                  >
                    <Form.Item label="Selecione o responsável">
                      <Select
                        placeholder="Selecione o responsável"
                        disabled={!isChangingResponsible}
                        onChange={(value: string) => setResponsibleId(value)}
                      >
                        {company.employeers.map(employeer => (
                          <Option value={employeer._id} key={employeer._id}>
                            {employeer.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Form>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={handleChangeResponsible}
                    loading={loading}
                  >
                    Confirmar
                  </Button>
                </SelectResponsibleWrapper>
              ) : (
                <>
                  {isEditing && (
                    <Upload {...uploadProps} method="PATCH">
                      <Button
                        style={{ width: '100%', marginBottom: 32 }}
                        icon={<UploadOutlined />}
                      >
                        Adicionar foto
                      </Button>
                    </Upload>
                  )}

                  <Form
                    {...layout}
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{ ...asset, unitId: unit?._id }}
                  >
                    <Form.Item
                      label="Nome do Ativo"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor digite um nome!',
                        },
                      ]}
                    >
                      <Input defaultValue={asset.name} disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item
                      label="Tipo"
                      name="type"
                      rules={[
                        { required: true, message: 'Por favor digite o tipo!' },
                      ]}
                    >
                      <Input defaultValue={asset.type} disabled={!isEditing} />
                    </Form.Item>

                    <Form.Item
                      label="Modelo do equipamento"
                      name="modelName"
                      rules={[
                        {
                          required: true,
                          message: 'Por favor digite o modelo!',
                        },
                      ]}
                    >
                      <Input
                        defaultValue={asset.modelName}
                        disabled={!isEditing}
                      />
                    </Form.Item>

                    <Form.Item label="Descrição" name="description">
                      <TextArea
                        showCount
                        maxLength={100}
                        defaultValue={asset.description}
                        disabled={!isEditing}
                      />
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
                      <Select
                        placeholder="Selecione o estado do ativo"
                        defaultValue={asset.state}
                        disabled={!isEditing}
                      >
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
                      <Select
                        placeholder="Selecione a unidade"
                        disabled={!isEditing}
                      >
                        {company.units.map(eachUnit => (
                          <Option value={eachUnit._id}>{eachUnit.name}</Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="Responsável" name="responsibleId">
                      <Select
                        placeholder="Selecione o responsável"
                        defaultValue={
                          asset.responsible ? asset.responsible._id : ''
                        }
                        disabled={!isEditing}
                      >
                        {company.employeers.map(employeer => (
                          <Option value={employeer._id}>
                            {employeer.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {isEditing && (
                      <Form.Item {...tailLayout}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={handleSubmitForm}
                          loading={loading}
                        >
                          Confirmar
                        </Button>
                      </Form.Item>
                    )}
                  </Form>
                </>
              )}
            </FormWrapper>
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
};

export default DisplayAsset;
