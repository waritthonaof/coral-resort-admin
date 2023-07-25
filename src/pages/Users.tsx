import UserForm from '../features/users/UserForm';
import Heading from '../ui/ui-elements/Heading';

const Users = () => {
  return (
    <>
      <Heading as="h1">Create new user</Heading>
      <UserForm />
    </>
  );
};
export default Users;
