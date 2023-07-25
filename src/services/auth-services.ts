import axios, { AxiosResponse } from 'axios';

import { getLocalStorage, setLocalStorage } from '../utils/localstorage';
import { URL } from '../utils/constants';
import { ISignup, IUpdatePassword } from '../interface/auth-interface';

const url = URL;

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response: AxiosResponse = await axios.post(`${url}/auth/login`, {
      email,
      password,
    });

    const userData = {
      token: response.data.token,
      user: response.data.data,
    };

    setLocalStorage('user-auth', userData);

    return response.data;
  } catch (err) {
    throw new Error('Failed to Login');
  }
};

export const getMe = async () => {
  try {
    const value = getLocalStorage('user-auth');

    if (!value) return null;

    const response: AxiosResponse = await axios.get(`${url}/users/me`, {
      headers: {
        Authorization: `Bearer ${value.token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const signupApi = async ({
  name,
  email,
  password,
  passwordConfirm,
  role,
}: ISignup) => {
  const response: AxiosResponse<any> = await axios.post(`${url}/auth/signup`, {
    name,
    email,
    password,
    passwordConfirm,
    role,
  });
  return response.data;
};

export const updatePasswordApi = async ({
  passwordCurrent,
  password,
  passwordConfirm,
}: IUpdatePassword) => {
  const value = getLocalStorage('user-auth');

  if (!value) return null;

  const response: AxiosResponse<any> = await axios.patch(
    `${URL}/auth/update-password`,
    { passwordCurrent, password, passwordConfirm },
    {
      headers: {
        Authorization: `Bearer ${value.token}`,
      },
    }
  );
  return response.data;
};
