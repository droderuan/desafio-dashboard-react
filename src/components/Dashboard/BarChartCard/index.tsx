import React, { useMemo, useRef, RefObject, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useCompany } from '../../../hooks/Company';
import GenerateBarChartOptions from '../../../utils/charts/GenerateBarChartOptions';

import { ChartsContainer } from './styles';

interface ChartRefProps {
  chart: Highcharts.Chart;
  container: RefObject<HTMLDivElement>;
}

const BarChart: React.FC = () => {
  const { company } = useCompany();
  const chartRef = useRef<ChartRefProps>(null);

  const options = useMemo(
    () => GenerateBarChartOptions({ units: company.units, height: 250 }),
    [company],
  );

  useEffect(() => {
    chartRef.current?.chart.reflow();
  }, [chartRef]);

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

export default BarChart;
