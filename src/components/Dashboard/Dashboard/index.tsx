import React, { useMemo } from 'react';
import { Statistic, PageHeader } from 'antd';
import { useCompany } from '../../../hooks/Company';

import PieChart from '../PieChartCard';
import BarChartCard from '../BarChartCard';

import { Container, ChartsContainer } from './styles';

const Dashboard: React.FC = () => {
  const { company } = useCompany();

  const totalAssetsCount = useMemo(() => {
    if (company.assets) {
      return company.assets.length;
    }
    return null;
  }, [company]);

  return (
    <Container>
      <PageHeader title="Visão geral">
        <Statistic
          title="Total de ativos"
          value={totalAssetsCount || 'Sem ativos no momento'}
        />
      </PageHeader>
      <ChartsContainer>
        <PieChart />
        <BarChartCard />
      </ChartsContainer>
    </Container>
  );
};

export default Dashboard;
