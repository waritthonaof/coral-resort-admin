import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { format, isToday } from 'date-fns';
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from 'react-icons/hi2';

import { Booking } from '../../interface/booking-interface';
import Table from '../../ui/ui-elements/Table';
import {
  formatCurrency,
  formatDistanceFromNow,
  formatDistanceTwoDate,
} from '../../utils/helper';
import Tag from '../../ui/ui-elements/Tag';
import Modal from '../../ui/ui-elements/Modal';
import Options from '../../ui/ui-elements/Options';
import { useCheckout } from '../../hooks/checkin-out-hook';

const LodgingName = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

interface StatusTagName {
  [key: string]: string;
}

const BookingRow = ({ booking }: { booking: Booking }) => {
  const navigate = useNavigate();

  const { checkout } = useCheckout();

  const {
    _id: bookingId,
    lodging,
    user,
    startDate,
    endDate,
    status,
    totalPrice,
  } = booking;

  const statusToTagName: StatusTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };
  return (
    <Table.Row>
      <LodgingName>{lodging.name}</LodgingName>
      <Stacked>
        <span>{user.name}</span>
        <span>{user.email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          &rarr; {formatDistanceTwoDate(startDate, endDate)}
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status}</Tag>
      <Amount>{formatCurrency(totalPrice)}</Amount>

      <div>
        <Modal>
          <Options>
            <Options.Toggle id={bookingId} />

            <Options.List id={bookingId}>
              <Options.Button
                icon={<HiEye />}
                onClick={async () => navigate(`/bookings/${bookingId}`)}>
                See detail
              </Options.Button>
              {status === 'unconfirmed' && (
                <Options.Button
                  icon={<HiArrowDownOnSquare />}
                  onClick={async () => navigate(`/checkin/${bookingId}`)}>
                  Check in
                </Options.Button>
              )}
              {status === 'checked-in' && (
                <Options.Button
                  icon={<HiArrowUpOnSquare />}
                  onClick={() => checkout({ bookingId })}>
                  Check out
                </Options.Button>
              )}
            </Options.List>
          </Options>
        </Modal>
      </div>
    </Table.Row>
  );
};
export default BookingRow;
