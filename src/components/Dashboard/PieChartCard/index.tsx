import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useCompany } from '../../../hooks/Company';
import GeneratePieChartOptions from '../../../utils/charts/GeneratePieChartOptions';

import { ChartsContainer } from './styles';

interface ChartRefProps {
  chart: Highcharts.Chart;
  container: RefObject<HTMLDivElement>;
}

const PieChart: React.FC = () => {
  const { company } = useCompany();
  const chartRef = useRef<ChartRefProps>(null);

  const options = useMemo(
    () => GeneratePieChartOptions({ units: company.units, height: 250 }),
    [company],
  );

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.reflow();
    }
  }, []);

  return (
    <ChartsContainer>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </ChartsContainer>
  );
};

export default PieChart;
