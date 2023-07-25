import Button from '../../ui/form-elements/Button';
import Modal from '../../ui/ui-elements/Modal';
import LodgingForm from './LodgingForm';

const LodgingCreate = () => {
  return (
    <div>
      <Modal>
        <Modal.Open name="lodging-form">
          <Button>Create new lodging</Button>
        </Modal.Open>

        <Modal.Window name="lodging-form">
          <LodgingForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default LodgingCreate;
