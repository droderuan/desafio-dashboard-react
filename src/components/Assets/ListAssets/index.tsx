import React, { useCallback, useMemo } from 'react';
import { List, Statistic, Button, Typography, PageHeader } from 'antd';
import { green, orange, red } from '@ant-design/colors';
import {
  SmileOutlined,
  MehOutlined,
  FrownOutlined,
  UserOutlined,
  RightOutlined,
  PlusOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useCompany } from '../../../hooks/Company';
import BgPlaceholder from '../../../assets/image-placeholder.png';

import {
  ImageSkeleton,
  ImagePlaceholder,
  ListItem,
  Label,
  ListItemInfo,
  ListItemInfoHeader,
  ListInfoContent,
} from './styles';

interface ListAssetsProps {
  handleViewAsset: (assetId: string) => void;
  handleCreateAsset: () => void;
}
interface IHealthStatus {
  color: string;
  icon: any;
  message: string;
}

interface IAssets {
  _id: string;
  name: string;
  type: string;
  modelName: string;
  description: string;
  state: string;
  healthscore: number;
  avgDecreaseHealthScore: number;
  unit: string;
  responsible: {
    _id: string;
    name: string;
  };
  image: {
    url: string;
    name: string;
  };
  healthStatus: IHealthStatus;
}

const ListAssets: React.FC<ListAssetsProps> = ({
  handleViewAsset,
  handleCreateAsset,
}) => {
  const { Title } = Typography;

  const { company } = useCompany();

  const healthScoreType = useCallback((healthScore: number): IHealthStatus => {
    if (healthScore >= 80) {
      return { color: green[6], message: 'Estável', icon: <SmileOutlined /> };
    }
    if (healthScore > 60 && healthScore < 80) {
      return { color: orange[6], message: 'Em Alerta', icon: <MehOutlined /> };
    }
    return { color: red[6], message: 'Crítico', icon: <FrownOutlined /> };
  }, []);

  const parseAssets = useMemo(() => {
    const toParse: IAssets[] = [];
    company.units.forEach(unit => {
      unit.assets.forEach(eachAsset => {
        const healthStatus = healthScoreType(eachAsset.healthscore);
        const parsed = {
          ...eachAsset,
          healthStatus,
        };

        toParse.push(parsed);
      });
    });
    return toParse;
  }, [healthScoreType, company.units]);

  const getUnitName = useCallback(
    (unitId: string) => {
      const findedUnit = company.units.find(eachUnit => {
        const check = eachUnit.assets.find(
          eachUnitAsset => eachUnitAsset._id === unitId,
        );

        if (!check) {
          return false;
        }
        return true;
      });
      if (!findedUnit) {
        return 'Sem unidade definida';
      }
      return findedUnit.name;
    },
    [company.units],
  );

  return (
    <>
      <PageHeader
        title="Ativos"
        extra={[
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateAsset}
          >
            Adicionar Ativo
          </Button>,
        ]}
      />
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 4,
        }}
        style={{ height: '100%' }}
        dataSource={parseAssets}
        renderItem={asset => (
          <ListItem key={asset._id}>
            <ImageSkeleton
              src={asset.image.url}
              placeholder={<ImagePlaceholder src={BgPlaceholder} alt="" />}
            />
            <ListItemInfo>
              <ListItemInfoHeader>
                <Title level={3} style={{ marginRight: 32 }}>
                  {asset.name}
                </Title>
                <Button
                  type="primary"
                  shape="circle"
                  icon={
                    <RightOutlined onClick={() => handleViewAsset(asset._id)} />
                  }
                />
              </ListItemInfoHeader>
              <ListInfoContent>
                <Label>
                  <Statistic
                    title="Healthscore"
                    value={asset.healthscore}
                    precision={1}
                    valueStyle={{
                      color: asset.healthStatus.color,
                    }}
                    prefix={asset.healthStatus.icon}
                  />
                </Label>
                <Label>
                  <Statistic
                    title="Saúde"
                    value={asset.healthStatus.message}
                    precision={1}
                    valueStyle={{
                      color: asset.healthStatus.color,
                    }}
                  />
                </Label>
                <Label>
                  <Statistic title="Estado" value={asset.state} />
                </Label>
                <Label>
                  <Statistic
                    title="Responsável"
                    value={
                      asset.responsible
                        ? asset.responsible.name
                        : 'Sem responsável'
                    }
                    prefix={<UserOutlined />}
                  />
                </Label>
                <Label>
                  <Statistic
                    title="Unidade"
                    value={getUnitName(asset._id)}
                    prefix={<HomeOutlined />}
                  />
                </Label>
              </ListInfoContent>
            </ListItemInfo>
          </ListItem>
        )}
      />
    </>
  );
};

export default ListAssets;
