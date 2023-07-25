import { ChangeEvent } from 'react';

import { useSearchParams } from 'react-router-dom';
import SelectSort from '../form-elements/SelectSort';

interface OptionProps {
  value: string;
  label: string;
}

interface SortProps {
  options: OptionProps[];
}

const Sort = ({ options }: SortProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <SelectSort
      options={options}
      type="white"
      value={sort}
      onChange={handleChange}
    />
  );
};
export default Sort;
