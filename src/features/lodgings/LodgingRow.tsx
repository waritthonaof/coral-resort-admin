import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi2';

import Table from '../../ui/ui-elements/Table';
import Options from '../../ui/ui-elements/Options';
import Modal from '../../ui/ui-elements/Modal';
import LodgingForm from './LodgingForm';
import ConfirmDelete from '../../ui/ui-elements/ConfirmDelete';
import { Lodging } from '../../interface/lodging-interface';
import { useDeleteLodging } from '../../hooks/lodging-hook';
import { formatCurrency } from '../../utils/helper';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Type = styled.div`
  font-weight: 600;
  color: var(--color-grey-500);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const LodgingRow = ({ lodging }: { lodging: Lodging }) => {
  const { deleteLodging, isDeleting } = useDeleteLodging();
  const navigate = useNavigate();

  const { id, name, type, imageCover, maxCapacity, price, discount } = lodging;

  const handleDeleteLoding = () => {
    deleteLodging(id!);
  };

  return (
    <>
      <Table.Row>
        <Img src={imageCover} />
        <Name>{name}</Name>
        <Type>{type}</Type>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(price)}</Price>
        {discount > 0 ? <Discount>{formatCurrency(discount)}</Discount> : '-'}
        <div>
          <Modal>
            <Options>
              <Options.Toggle id={id!} />

              <Options.List id={id!}>
                <Options.Button
                  icon={<HiEye />}
                  onClick={async () => navigate(`/lodgings/${id}`)}>
                  Detail
                </Options.Button>

                <Modal.Open name="edit">
                  <Options.Button icon={<HiPencil />}>Edit</Options.Button>
                </Modal.Open>

                <Modal.Open name="delete">
                  <Options.Button icon={<HiTrash />}>Delete</Options.Button>
                </Modal.Open>
              </Options.List>

              <Modal.Window name="edit">
                <LodgingForm lodgingToUpdate={lodging} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  name={`lodgings ${name}`}
                  disabled={isDeleting}
                  onConfirm={() => handleDeleteLoding()}
                />
              </Modal.Window>
            </Options>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};
export default LodgingRow;
