import Filter from '../../ui/ui-elements/Filter';
import Sort from '../../ui/ui-elements/Sort';
import TableOperations from '../../ui/ui-elements/TableOperations';

const BookigOperations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'checked-in', label: 'Checked-in' },
          { value: 'checked-out', label: 'Checked-out' },
          { value: 'unconfirmed', label: 'Unconfirmed' },
        ]}
      />
      <Sort
        options={[
          { value: 'startDate', label: 'Sort by date (recent first)' },
          { value: '-startDate', label: 'Sort by date (earlier first)' },
          { value: 'totalPrice', label: 'Sort by amount (high first)' },
          { value: '-totalPrice', label: 'Sort by amount (low first)' },
        ]}
      />
    </TableOperations>
  );
};
export default BookigOperations;
