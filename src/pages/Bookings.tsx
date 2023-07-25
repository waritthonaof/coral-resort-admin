import BookigOperations from '../features/bookings/BookigOperations';
import BookingTable from '../features/bookings/BookingTable';
import FlextContainer from '../ui/ui-elements/FlexContainer';
import Heading from '../ui/ui-elements/Heading';

const Bookings = () => {
  return (
    <>
      <FlextContainer>
        <Heading as="h1">Bookings</Heading>
        <BookigOperations />
      </FlextContainer>
      <FlextContainer direction="column">
        <BookingTable />
      </FlextContainer>
    </>
  );
};
export default Bookings;
