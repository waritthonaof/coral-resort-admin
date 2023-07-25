import styled from 'styled-components';
import Button from '../form-elements/Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface ConfirmProps {
  name: string;
  disabled: boolean;
  onConfirm: () => void;
  onCloseModal?: () => void;
}

const ConfirmDelete = ({
  name,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmProps) => {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {name}</Heading>
      <p>
        Are you sure you want to delete this <strong>{name}</strong> ?
      </p>
      <p>This action cannot be undone.</p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
};
export default ConfirmDelete;
