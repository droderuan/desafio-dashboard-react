import { volcano, red, green } from '@ant-design/colors';
import { IUnit } from '../../dtos/IUnit';

interface IBarChartProps {
  units: IUnit[];
  height: number;
}

export default function GeneratePieChartOptions({
  units,
  height,
}: IBarChartProps): any {
  if (!units) {
    return [];
  }

  const warning = units.reduce((total, unit) => unit.onAlert + total, 0);

  const critical = units.reduce((total, unit) => unit.onCritical + total, 0);

  const totalAssets = units.reduce(
    (total, unit) => unit.countAssets + total,
    0,
  );

  const series = [
    {
      name: 'Estável',
      y: totalAssets - warning - critical,
      color: green[5],
    },
    { name: 'Em alerta', y: warning, color: volcano[5] },
    { name: 'Critíco', y: critical, color: red[5] },
  ];

  const options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
      plotShadow: false,
      type: 'pie',
      height,
    },
    title: {
      text: 'Visão geral dos healthscore',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },

    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}',
        },
      },
    },
    series: [
      {
        name: 'Ativos',
        colorByPoint: true,
        data: [...series],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 200,
          },
        },
      ],
    },
  };

  return options;
}
