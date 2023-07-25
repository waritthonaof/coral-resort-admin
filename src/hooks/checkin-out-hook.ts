import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateData } from '../services/http-services';
import { useNavigate } from 'react-router-dom';
import { URL } from '../utils/constants';

const url = `${URL}/bookings`;

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: string }) =>
      updateData(
        url,
        {
          status: 'checked-in',
          paid: true,
        },
        bookingId
      ),
    onSuccess: (data: any) => {
      toast.success(`Booking successfully checked in`);
      queryClient.invalidateQueries({
        queryKey: ['booking', data?.data?._id],
      });
      navigate('/bookings');
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return { checkin, isLoading };
};

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isLoading } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: string }) =>
      updateData(
        url,
        {
          status: 'checked-out',
        },
        bookingId
      ),
    onSuccess: (data: any) => {
      toast.success(`Booking successfully checked out`);
      queryClient.invalidateQueries({
        queryKey: ['booking', data?.data?._id],
      });
      navigate('/bookings');
    },
    onError: () => toast.error('There was an error while checking out'),
  });

  return { checkout, isLoading };
};
