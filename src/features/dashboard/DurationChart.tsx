import { styled } from 'styled-components';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import Heading from '../../ui/ui-elements/Heading';
import Spinner from '../../ui/ui-elements/Spinner';
import { useDarkMode } from '../../context/DarkmodeContext';
import { useStayDuration } from '../../hooks/booking-hook';

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: '1 night',
    value: 0,
    color: '#ef4444',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#f97316',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#eab308',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#84cc16',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#22c55e',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#14b8a6',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#3b82f6',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
];

const startDataDark = [
  {
    duration: '1 night',
    value: 0,
    color: '#b91c1c',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#c2410c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#a16207',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#4d7c0f',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#15803d',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0f766e',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#1d4ed8',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#7e22ce',
  },
];

const updateValue = (
  arr: { duration: string; value: number; color: string }[],
  key: string
) => {
  return arr.map((obj) => {
    return obj.duration === key ? { ...obj, value: obj.value + 1 } : obj;
  });
};

const prepareData = (startData: any, data: any) => {
  const chartData = data?.data.reduce((acc: any, cur: any) => {
    if (cur.days === 1) return updateValue(acc, '1 night');
    if (cur.days === 2) return updateValue(acc, '2 nights');
    if (cur.days === 3) return updateValue(acc, '3 nights');
    if (cur.days === 4 || cur.days === 5) return updateValue(acc, '4-5 nights');
    if (cur.days === 6 || cur.days === 7) return updateValue(acc, '6-7 nights');
    if (cur.days >= 8 && cur.days <= 14) return updateValue(acc, '8-14 nights');
    if (cur.days >= 15 && cur.days <= 21)
      return updateValue(acc, '15-21 nights');
    if (cur.days > 21) return updateValue(acc, '21+ nights');

    return acc;
  }, startData);

  return chartData;
};

const DurationChart = () => {
  const { isDarkMode } = useDarkMode();
  const { data, isLoading } = useStayDuration();

  if (isLoading) return <Spinner />;

  const startData = isDarkMode ? startDataDark : startDataLight;

  const chartData = prepareData(startData, data);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}>
            {chartData.map((entry: any) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            widths="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
};
export default DurationChart;
