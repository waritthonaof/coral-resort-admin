import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

import { fetchData } from '../services/http-services';
import {
  Booking,
  PricePerday,
  ResBooking,
  StayDuration,
  SumTotalPrice,
} from '../interface/booking-interface';
import { URL } from '../utils/constants';

const url = `${URL}/bookings`;

const useBookings = (): UseQueryResult<ResBooking> => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get('status');
  const filter = !filterValue || filterValue === 'all' ? null : filterValue;

  const sortValue = searchParams.get('sort');
  const sort = sortValue ? sortValue : 'startDate';

  const pageValue = Number(searchParams.get('page'));
  const page = !pageValue || pageValue < 1 ? 1 : pageValue;

  const data = useQuery({
    queryKey: ['bookings', filter, sort, page],
    queryFn: () =>
      fetchData<ResBooking>(url, 'Bookings not found!', {
        status: filter,
        sort,
        page,
      }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(data.data?.results! / 10);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page + 1],
      queryFn: () =>
        fetchData<ResBooking>(url, 'Bookings not found!', {
          status: filter,
          sort,
          page: page + 1,
        }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sort, page - 1],
      queryFn: () =>
        fetchData<ResBooking>(url, 'Bookings not found!', {
          status: filter,
          sort,
          page: page - 1,
        }),
    });

  return data;
};

const useBooking = () => {
  const { bookingId } = useParams();

  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () =>
      fetchData<{ data: Booking; status: string }>(
        `${url}/${bookingId}`,
        `Booking with id ${bookingId} not found!`
      ),
  });
};

const useCheckin = (): UseQueryResult<ResBooking> => {
  return useQuery({
    queryKey: ['bookings', 'checked-in'],
    queryFn: () =>
      fetchData<ResBooking>(url, 'Bookings not found!', {
        status: ['checked-in', 'checked-out'],
      }),
  });
};

const useSumTotalPrice = (): UseQueryResult<SumTotalPrice> => {
  return useQuery({
    queryKey: ['bookings', 'total-price'],
    queryFn: () =>
      fetchData<SumTotalPrice>(`${url}/total-price`, 'Bookings not found!'),
  });
};

const usePricePerDay = (): UseQueryResult<PricePerday> => {
  return useQuery({
    queryKey: ['bookings', 'price-per-day'],
    queryFn: () =>
      fetchData<PricePerday>(`${url}/price-per-day`, 'Bookings not found!'),
  });
};

const useStayDuration = (): UseQueryResult<StayDuration> => {
  return useQuery({
    queryKey: ['bookings', 'stay-duration'],
    queryFn: () =>
      fetchData<StayDuration>(`${url}/stay-duration`, 'Bookings not found!'),
  });
};

const useToday = (): UseQueryResult<{
  status: 'success' | 'fail';
  data: Booking[];
}> => {
  return useQuery({
    queryKey: ['bookings', 'today'],
    queryFn: () =>
      fetchData<{
        status: 'success' | 'fail';
        data: Booking[];
      }>(`${url}/today`, 'Bookings not found!'),
  });
};

export {
  useBookings,
  useBooking,
  useCheckin,
  useSumTotalPrice,
  usePricePerDay,
  useStayDuration,
  useToday,
};
