import Spinner from '../../ui/ui-elements/Spinner';
import Table from '../../ui/ui-elements/Table';
import LodgingRow from './LodgingRow';

import { useLodgings } from '../../hooks/lodging-hook';
import { Lodging } from '../../interface/lodging-interface';
import Pagination from '../../ui/ui-elements/Pagination';

const LodgingTable = () => {
  const { data, isLoading } = useLodgings();

  const lodgings: Lodging[] | undefined = data?.data;

  if (isLoading) return <Spinner />;

  return (
    <Table columns="0.6fr 1.8fr 1fr 2fr 1fr 1fr 3.2rem">
      <Table.Header>
        <div></div>
        <div>Name</div>
        <div>Type</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={lodgings}
        render={(lodging: Lodging) => (
          <LodgingRow lodging={lodging} key={lodging.id} />
        )}
      />
      <Table.Footer>
        <Pagination count={data?.results} />
      </Table.Footer>
    </Table>
  );
};
export default LodgingTable;
