import { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select<{ type?: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${({ type }) =>
      type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface OptionProps {
  value: string;
  label: string;
}

interface AdditionalProps {
  [key: string]: any;
}

interface SeletectProps {
  options?: OptionProps[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectSort: FC<SeletectProps & AdditionalProps> = ({
  options,
  value,
  onChange,
  ...props
}) => {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};
export default SelectSort;
