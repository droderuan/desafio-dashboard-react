import { purple, yellow, blue } from '@ant-design/colors';
import { IUnit } from '../../dtos/IUnit';

interface IBarChartProps {
  units: IUnit[];
  height: number;
}

export default function GenerateBarChartOptions({
  units,
  height,
}: IBarChartProps): any {
  if (!units) {
    return [];
  }

  const series = units.map(unit => ({
    name: unit.name,
    data: [unit.inUse, unit.underMaintenance, unit.disable],
  }));

  const options = {
    chart: {
      plotBackgroundColor: undefined,
      plotBorderWidth: undefined,
      plotShadow: false,
      type: 'column',
      height,
      color: [yellow[5]],
    },
    title: {
      text: 'Estados dos ativos',
    },
    xAxis: {
      categories: ['Disponível', 'Em manutenção', 'Desativado'],
      crosshair: true,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>',
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [...series],
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
