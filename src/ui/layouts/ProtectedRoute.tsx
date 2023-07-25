import { FC, ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { styled } from 'styled-components';

import { useUser } from '../../hooks/auth-hook';
import Spinner from '../ui-elements/Spinner';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IProtectedRoute {
  children: ReactElement;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, isAuthenticate } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticate) {
      localStorage.removeItem('user-auth');
      queryClient.removeQueries();
      navigate('/login');
    }
  }, [isAuthenticate, isLoading, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return children;
};

export default ProtectedRoute;
