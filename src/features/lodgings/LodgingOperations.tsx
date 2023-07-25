import Filter from '../../ui/ui-elements/Filter';
import Sort from '../../ui/ui-elements/Sort';
import TableOperations from '../../ui/ui-elements/TableOperations';

const LodgingOprerations = () => {
  return (
    <TableOperations>
      <Filter
        filterField="type"
        options={[
          { value: 'all', label: 'All' },
          { value: 'Bungalow', label: 'Bungalow' },
          { value: 'Room', label: 'Room' },
        ]}
      />
      <Sort
        options={[
          { value: 'name', label: 'Sort by name(A-Z)' },
          { value: '-name', label: 'Sort by name(Z-A)' },
          { value: 'price', label: 'Sort by price (low first)' },
          { value: '-price', label: 'Sort by price (high first)' },
          { value: 'maxCapacity', label: 'Sort by capacity (low first)' },
          { value: '-maxCapacity', label: 'Sort by capacity (high first)' },
        ]}
      />
    </TableOperations>
  );
};
export default LodgingOprerations;
