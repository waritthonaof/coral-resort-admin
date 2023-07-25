import FormRow from '../../ui/form-elements/FormRow';
import Input from '../../ui/form-elements/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../../ui/form-elements/Button';
import { IUpdatePassword } from '../../interface/auth-interface';
import Form from '../../ui/form-elements/Form';
import { useUpdatePassword } from '../../hooks/auth-hook';

const UserPasswordForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IUpdatePassword>();

  const { isUpdating, updatePassword } = useUpdatePassword();

  const onSubmit: SubmitHandler<IUpdatePassword> = ({
    passwordCurrent,
    password,
    passwordConfirm,
  }: IUpdatePassword) => {
    updatePassword({ passwordCurrent, password, passwordConfirm });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Current password"
        error={errors?.passwordCurrent?.message}>
        <Input
          type="passwordCurrent"
          id="passwordCurrent"
          disabled={isUpdating}
          {...register('passwordCurrent', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="New password (min 6 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password needs a minimum of 6 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm new password"
        error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={reset} type="reset" variation="secondary">
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </>
      </FormRow>
    </Form>
  );
};

export default UserPasswordForm;
