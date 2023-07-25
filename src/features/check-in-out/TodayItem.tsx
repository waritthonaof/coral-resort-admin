import styled from 'styled-components';

import { Link } from 'react-router-dom';
import Tag from '../../ui/ui-elements/Tag';
import Button from '../../ui/form-elements/Button';
import { Booking } from '../../interface/booking-interface';
import { useCheckout } from '../../hooks/checkin-out-hook';
import { formatDistanceTwoDate } from '../../utils/helper';

const StyledTodayItem = styled.li`
  display: flex;
  justify-content: space-between;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const TodayItem = ({ activity }: { activity: Booking }) => {
  const { checkout, isLoading: isCheckingOut } = useCheckout();

  const { _id: bookingId, user, startDate, endDate, status } = activity;

  return (
    <StyledTodayItem>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Guest>{user.name}</Guest>
      <div>{formatDistanceTwoDate(startDate, endDate)}</div>
      {status === 'unconfirmed' && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${bookingId}`}>
          Check in
        </Button>
      )}

      {status === 'checked-in' && (
        <Button
          variation="primary"
          size="small"
          onClick={() => checkout({ bookingId })}
          disabled={isCheckingOut}>
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
};
export default TodayItem;
