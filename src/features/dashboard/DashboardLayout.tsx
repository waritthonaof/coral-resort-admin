import styled from 'styled-components';
import Stats from './Stats';
import {
  useBookings,
  useCheckin,
  useSumTotalPrice,
} from '../../hooks/booking-hook';

import Spinner from '../../ui/ui-elements/Spinner';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { data: bookings, isLoading: isBookings } = useBookings();

  const { data: checkIn, isLoading: isCheckin } = useCheckin();

  const { data: sumTotalPrice, isLoading: isSumTotalPrice } =
    useSumTotalPrice();

  if (isBookings || isCheckin || isSumTotalPrice) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        totalBookings={bookings?.['results']}
        checkin={checkIn?.['results']}
        totalPrice={sumTotalPrice?.['data']?.['sumTotalPrice']}
      />
      <TodayActivity />
      <DurationChart />
      <SalesChart />
    </StyledDashboardLayout>
  );
};
export default DashboardLayout;
