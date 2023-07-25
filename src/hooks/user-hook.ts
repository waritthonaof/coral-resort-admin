import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { updateMe } from '../services/user-services';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: (data: FormData) => updateMe(data),
    onSuccess: (user) => {
      toast.success('Profile successfully updated');
      queryClient.setQueryData(['user-auth'], user);
      queryClient.invalidateQueries({
        queryKey: ['user-auth'],
      });
    },
    onError: (err: any) => {
      console.log(err);
      toast.error('Can not update profile please try again!');
    },
  });
  return { isUpdating, updateUser };
};
