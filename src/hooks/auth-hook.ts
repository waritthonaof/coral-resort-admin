import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import {
  getMe,
  loginApi,
  signupApi,
  updatePasswordApi,
} from '../services/auth-services';
import { ISignup, IUpdatePassword } from '../interface/auth-interface';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user-auth'], user);
      toast.success('Login success');
      navigate('/', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });
  return { login, isLoading };
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user-auth');

    queryClient.removeQueries();
    navigate('/login', { replace: true });
  };

  return { logout };
};

export const useUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user-auth'],
    queryFn: getMe,
  });

  return { user, isLoading, isAuthenticate: user?.status === 'success' };
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm, role }: ISignup) =>
      signupApi({
        name,
        email,
        password,
        passwordConfirm,
        role,
      }),
    onSuccess: () => {
      toast.success('User successfully created');
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  return { signup, isLoading };
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updatePassword } = useMutation({
    mutationFn: ({
      passwordCurrent,
      password,
      passwordConfirm,
    }: IUpdatePassword) =>
      updatePasswordApi({ passwordCurrent, password, passwordConfirm }),
    onSuccess: (user) => {
      toast.success('Password successfully updated');
      queryClient.setQueryData(['user-auth'], user);
      queryClient.invalidateQueries({
        queryKey: ['user-auth'],
      });
    },
    onError: (err: any) => {
      if (err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Can not update Password please try again!');
      }
    },
  });
  return { isUpdating, updatePassword };
};
