import { styled } from 'styled-components';
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

import DashboardBox from './DashboardBox';
import Heading from '../../ui/ui-elements/Heading';
import { useDarkMode } from '../../context/DarkmodeContext';
import { usePricePerDay } from '../../hooks/booking-hook';
import { format, set } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const SalesChart = () => {
  const { isDarkMode } = useDarkMode();
  const { data } = usePricePerDay();

  const salesData = data?.data.map((sale: any) => {
    const date = sale._id.day;
    const month = sale._id.month;
    const year = sale._id.year;

    const dateObject = set(new Date(year, month, date), {
      month: month - 1,
      date,
    });

    return {
      label: format(dateObject, 'MMM dd'),
      totalSales: sale.sumTotalPrice,
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
        text: '#e5e7eb',
        background: '#18212f',
      }
    : {
        totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
        text: '#374151',
        background: '#fff',
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">Sales at #2023</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={salesData}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
};
export default SalesChart;
