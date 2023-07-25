import {
  UseQueryResult,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { ResLodging } from '../interface/lodging-interface';
import {
  fetchData,
  deletData,
  createData,
  updateData,
} from '../services/http-services';
import { toast } from 'react-hot-toast';
import { URL } from '../utils/constants';
import { useSearchParams } from 'react-router-dom';

const url = `${URL}/lodgings`;

const useLodgings = (): UseQueryResult<ResLodging> => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('type');
  const filter = !filterValue || filterValue === 'all' ? null : filterValue;

  const sortValue = searchParams.get('sort');
  const sort = sortValue ? sortValue : 'name';

  const pageValue = Number(searchParams.get('page'));
  const page = !pageValue || pageValue < 1 ? 1 : pageValue;

  const data = useQuery<ResLodging>({
    queryKey: ['lodgings', filter, sort, page],
    queryFn: () =>
      fetchData<ResLodging>(url, 'Lodgings not found!', {
        type: filter,
        sort,
        page,
      }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(data.data?.results! / 10);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['lodgings', filter, sort, page + 1],
      queryFn: () =>
        fetchData<ResLodging>(url, 'lodgings not found!', {
          type: filter,
          sort,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['lodgings', filter, sort, page - 1],
      queryFn: () =>
        fetchData<ResLodging>(url, 'lodgings not found!', {
          type: filter,
          sort,
          page: page - 1,
        }),
    });

  return data;
};

const useCreateLodging = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createLodging } = useMutation({
    mutationFn: (newData: FormData) => createData(url, newData),
    onSuccess: () => {
      toast.success('New loding successfully created');
      queryClient.invalidateQueries({
        queryKey: ['lodgings'],
      });
    },
    onError: (err: any) => toast.error(err.messsage),
  });
  return { isCreating, createLodging };
};

const useUpdateLodging = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateLodging } = useMutation({
    mutationFn: ({ data, id }: { data: FormData; id: string }) =>
      updateData(url, data, id),
    onSuccess: () => {
      toast.success('Loding successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['lodgings'],
      });
    },
    onError: (err: any) => toast.error(err.messsage),
  });
  return { isUpdating, updateLodging };
};

const useDeleteLodging = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteLodging } = useMutation({
    mutationFn: (id: string) => deletData(url, id),
    onSuccess: () => {
      toast.success('Loding successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['lodgings'],
      });
    },
    onError: (err: any) => toast.error(err.messsage),
  });
  return { isDeleting, deleteLodging };
};

export { useLodgings, useDeleteLodging, useCreateLodging, useUpdateLodging };
