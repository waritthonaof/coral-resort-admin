import axios, { AxiosResponse } from 'axios';
import { Lodging } from '../interface/lodging-interface';

export const fetchData = async <T>(
  url: string,
  errMessage: string,
  queryParams?: {
    type?: string | null | string[];
    status?: string | null | string[];
    sort?: string;
    page?: number;
  }
): Promise<T> => {
  const params = queryParams;

  const response: AxiosResponse<T> = await axios.get(url, { params });

  if (response.status !== 200) {
    throw new Error(errMessage);
  }

  return response.data;
};

export const createData = async (
  url: string,
  newData: FormData
): Promise<Lodging> => {
  try {
    const response: AxiosResponse<Lodging> = await axios.post(url, newData);
    if (response.status !== 201) {
      throw new Error('Can not create this item!');
    }

    return response.data;
  } catch (err) {
    throw new Error('Failed to cleate data');
  }
};

export const updateData = async <T>(
  url: string,
  updateData: FormData | object,
  id: string
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.patch(
      `${url}/${id}`,
      updateData
    );
    if (response.status !== 200) {
      throw new Error('Can not update this item!');
    }

    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update data');
  }
};

export const deletData = async (url: string, id: string): Promise<null> => {
  try {
    const response: AxiosResponse<null> = await axios.delete(`${url}/${id}`);

    if (response.status !== 204) {
      throw new Error('Can not delete this item!');
    }

    return null;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to delete data');
  }
};
