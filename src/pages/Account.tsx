import UserPasswordForm from '../features/users/UserPasswordForm';
import UserUpdateForm from '../features/users/UserUpdateForm';
import FlextContainer from '../ui/ui-elements/FlexContainer';
import Heading from '../ui/ui-elements/Heading';

const Account = () => {
  return (
    <>
      <FlextContainer direction="column">
        <Heading as="h1">Update your account</Heading>
        <UserUpdateForm />
      </FlextContainer>
      <FlextContainer direction="column">
        <Heading as="h1">Update password</Heading>
        <UserPasswordForm />
      </FlextContainer>
    </>
  );
};
export default Account;
