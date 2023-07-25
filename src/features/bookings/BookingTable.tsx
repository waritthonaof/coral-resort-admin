import { useBookings } from '../../hooks/booking-hook';
import { Booking } from '../../interface/booking-interface';
import { Empty } from '../../ui/ui-elements/Empty';
import Pagination from '../../ui/ui-elements/Pagination';
import Spinner from '../../ui/ui-elements/Spinner';
import Table from '../../ui/ui-elements/Table';
import BookingRow from './BookingRow';

const BookingTable = () => {
  const { data, isLoading } = useBookings();

  const bookings: Booking[] | undefined = data?.data;

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  return (
    <Table columns="2fr 2fr 2fr 1.5fr 1fr 3.2rem">
      <Table.Header>
        <div>Lodging</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={bookings}
        render={(booking: Booking) => (
          <BookingRow booking={booking} key={booking._id} />
        )}
      />
      <Table.Footer>
        <Pagination count={data?.results} />
      </Table.Footer>
    </Table>
  );
};
export default BookingTable;
