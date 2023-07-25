import styled from 'styled-components';
import FlextContainer from '../../ui/ui-elements/FlexContainer';
import Heading from '../../ui/ui-elements/Heading';
import TodayItem from './TodayItem';
import Spinner from '../../ui/ui-elements/Spinner';
import { useToday } from '../../hooks/booking-hook';
import { Booking } from '../../interface/booking-interface';

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

const TodayActivity = () => {
  const { data, isLoading } = useToday();

  return (
    <StyledToday>
      <FlextContainer>
        <Heading as="h2">Today</Heading>
      </FlextContainer>

      {!isLoading ? (
        data?.data?.length! > 0 ? (
          <TodayList>
            {data?.data?.map((activity: Booking) => (
              <TodayItem activity={activity} key={activity._id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
};
export default TodayActivity;
