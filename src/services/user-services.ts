import axios, { AxiosResponse } from 'axios';

import { getLocalStorage } from '../utils/localstorage';
import { URL } from '../utils/constants';

export const updateMe = async (updateData: FormData | object) => {
  const value = getLocalStorage('user-auth');

  if (!value) return null;

  const response: AxiosResponse<any> = await axios.patch(
    `${URL}/users/update-me`,
    updateData,
    {
      headers: {
        Authorization: `Bearer ${value.token}`,
      },
    }
  );
  return response.data;
};
