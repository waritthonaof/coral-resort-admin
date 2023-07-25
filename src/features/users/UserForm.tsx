import { SubmitHandler, useForm } from 'react-hook-form';
import Form from '../../ui/form-elements/Form';
import FormRow from '../../ui/form-elements/FormRow';
import Input from '../../ui/form-elements/Input';
import Button from '../../ui/form-elements/Button';
import { ISignup } from '../../interface/auth-interface';
import { useSignup } from '../../hooks/auth-hook';

const UserForm = () => {
  const { signup, isLoading } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } =
    useForm<ISignup>({
      defaultValues: {
        role: 'admin',
      },
    });
  const { errors } = formState;

  const onSubmit: SubmitHandler<ISignup> = ({
    name,
    email,
    password,
    passwordConfirm,
    role,
  }) => {
    signup(
      { name, email, password, passwordConfirm, role },
      { onSuccess: () => reset() }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 6 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password needs a minimum of 6 characters',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Password need to match',
          })}
        />
      </FormRow>
      <FormRow label="Role" error={errors?.role?.message}>
        <Input
          type="role"
          id="role"
          disabled={true}
          {...register('role', {
            required: 'This field is required',
            setValueAs: () => 'admin',
          })}
        />
      </FormRow>

      <FormRow>
        <>
          <Button variation="secondary" type="reset" onClick={reset}>
            Cancel
          </Button>
          <Button disabled={isLoading}>Create new user</Button>
        </>
      </FormRow>
    </Form>
  );
};
export default UserForm;
