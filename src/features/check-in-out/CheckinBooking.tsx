import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BookingDataBox from '../../features/bookings/BookingDataBox';
import { useBooking } from '../../hooks/booking-hook';
import Spinner from '../../ui/ui-elements/Spinner';
import { Booking } from '../../interface/booking-interface';
import FlextContainer from '../../ui/ui-elements/FlexContainer';
import Heading from '../../ui/ui-elements/Heading';
import ButtonText from '../../ui/ui-elements/ButtonText';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '../../ui/ui-elements/ButtonGroup';
import Button from '../../ui/form-elements/Button';
import Checkbox from '../../ui/ui-elements/Checkbox';
import { formatCurrency } from '../../utils/helper';
import { useCheckin } from '../../hooks/checkin-out-hook';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useBooking();
  const { checkin } = useCheckin();

  const booking: Booking = data?.data!;

  useEffect(() => setConfirmPaid(booking?.paid ?? false), [booking?.paid]);

  if (isLoading) return <Spinner />;

  const { _id: bookingId, user, totalPrice, paid } = booking;

  const handleCheckin = () => {
    if (!confirmPaid) return;
    checkin({ bookingId });
  };

  return (
    <>
      <FlextContainer>
        <Heading as="h1">Check in booking </Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </FlextContainer>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          disabled={paid}
          id="confirm">
          I confirm that {user.name} has paid the total amount of{' '}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking
        </Button>

        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};

export default CheckinBooking;
