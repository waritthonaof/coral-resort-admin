import { useForm, SubmitHandler } from 'react-hook-form';

import Form from '../../ui/form-elements/Form';
import FormRow from '../../ui/form-elements/FormRow';
import Input from '../../ui/form-elements/Input';
import Textarea from '../../ui/form-elements/Textarea';
import Button from '../../ui/form-elements/Button';
import FileInput from '../../ui/form-elements/FileInput';
import Select from '../../ui/form-elements/Select';

import { Lodging } from '../../interface/lodging-interface';
import { useCreateLodging, useUpdateLodging } from '../../hooks/lodging-hook';

interface FormInputs {
  [key: string]: any;
  name: string;
  type: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
  imageCover: any;
}

interface LodgingFormProps<T> {
  lodgingToUpdate?: T;
  onCloseModal?: () => void;
}

const LodgingForm = ({
  lodgingToUpdate,
  onCloseModal,
}: LodgingFormProps<Lodging>) => {
  let updateData = {
    id: '',
    data: {},
  };

  if (lodgingToUpdate) {
    const { id, ...updateValues } = lodgingToUpdate!;
    updateData.id = id!;
    updateData.data = updateValues;
  }

  const { id, data: updateValues } = updateData;

  const isUpdateSession = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<FormInputs>({
    defaultValues: isUpdateSession ? updateValues : {},
  });

  const { isCreating, createLodging } = useCreateLodging();
  const { isUpdating, updateLodging } = useUpdateLodging();

  const isWorking = isCreating || isUpdating;

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    let imageCover = data.imageCover;
    if (typeof data.imageCover === 'string') {
      imageCover = data.imageCover;
    } else if (data.imageCover instanceof FileList) {
      imageCover = data.imageCover?.[0];
    }
    data.imageCover = imageCover;

    const formData: FormData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (isUpdateSession) {
      const updateId = id as string;
      const updateData = {
        data: formData,
        id: updateId,
      };

      updateLodging(updateData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    } else {
      createLodging(formData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Lodging name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Lodging type" error={errors?.type?.message}>
        <Select {...register('type')}>
          <option value={'Bungalow'}>Bungalow</option>
          <option value={'Room'}>Room</option>
        </Select>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          {...register('price', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Price should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => {
              return (
                Number(value) <= Number(getValues().price) ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label="Lodging image cover">
        <FileInput
          id="imageCover"
          accept="image/*"
          type="file"
          {...register('imageCover')}
        />
      </FormRow>

      <FormRow>
        <>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}>
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isUpdateSession ? 'Edit cabin' : 'Create new'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
};
export default LodgingForm;
