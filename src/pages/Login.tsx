import { styled } from 'styled-components';
import Heading from '../ui/ui-elements/Heading';
import LoginForm from '../features/authentication/LoginForm';
import HeadingLogo from '../ui/ui-elements/HeadingLogo';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login = () => {
  return (
    <LoginLayout>
      <HeadingLogo page="login" />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
};
export default Login;
