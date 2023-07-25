import FlextContainer from '../ui/ui-elements/FlexContainer';
import Heading from '../ui/ui-elements/Heading';

import LodgingTable from '../features/lodgings/LodgingTable';
import LodgingCreate from '../features/lodgings/LodgingCreate';
import LodgingOprerations from '../features/lodgings/LodgingOperations';

const Rooms = () => {
  return (
    <>
      <FlextContainer>
        <Heading as="h1">Lodgings</Heading>
        <LodgingOprerations />
      </FlextContainer>
      <FlextContainer direction="column">
        <LodgingTable />
        <LodgingCreate />
      </FlextContainer>
    </>
  );
};
export default Rooms;
