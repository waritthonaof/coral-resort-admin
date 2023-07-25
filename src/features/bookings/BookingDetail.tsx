import { styled } from 'styled-components';
import FlextContainer from '../../ui/ui-elements/FlexContainer';
import Heading from '../../ui/ui-elements/Heading';
import Tag from '../../ui/ui-elements/Tag';
import ButtonText from '../../ui/ui-elements/ButtonText';
import { useNavigate } from 'react-router-dom';
import ButtonGroup from '../../ui/ui-elements/ButtonGroup';
import Button from '../../ui/form-elements/Button';

import { useBooking } from '../../hooks/booking-hook';
import { Booking } from '../../interface/booking-interface';
import BookingDataBox from './BookingDataBox';
import { Empty } from '../../ui/ui-elements/Empty';
import Spinner from '../../ui/ui-elements/Spinner';
import { useCheckout } from '../../hooks/checkin-out-hook';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

interface StatusTagName {
  [key: string]: string;
}

const BookingDetail = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useBooking();
  const { checkout } = useCheckout();

  const booking: Booking = data?.data!;

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { status, _id: bookingId } = booking;

  const statusToTagName: StatusTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <FlextContainer>
        <HeadingGroup>
          <Heading as="h1">Booking #{''}</Heading>
          <Tag type={statusToTagName[status]}>{status}</Tag>
        </HeadingGroup>
        <ButtonText onClick={() => navigate(-1)}>&larr; Back</ButtonText>
      </FlextContainer>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'checked-in' && (
          <Button onClick={() => checkout({ bookingId })}>Check Out</Button>
        )}
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
};
export default BookingDetail;
