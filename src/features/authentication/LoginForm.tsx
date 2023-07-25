import { useState, MouseEvent } from 'react';

import FormLogin from '../../ui/form-elements/FormLogin';
import Input from '../../ui/form-elements/Input';
import Button from '../../ui/form-elements/Button';
import Form from '../../ui/form-elements/Form';
import SpinnerMini from '../../ui/ui-elements/SpinnerMini';
import { useLogin } from '../../hooks/auth-hook';

const LoginForm = () => {
  const [email, setEmail] = useState('u01@mail.com');
  const [password, setPassword] = useState('123456');
  const { login, isLoading } = useLogin();

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLogin label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormLogin>
      <FormLogin label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormLogin>
      <FormLogin>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? 'Log in' : <SpinnerMini />}
        </Button>
      </FormLogin>
    </Form>
  );
};
export default LoginForm;
