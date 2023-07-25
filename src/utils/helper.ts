import { formatDistance, parseISO } from 'date-fns';

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

export const formatDistanceTwoDate = (startDate: string, endDate: string) =>
  formatDistance(parseISO(startDate), parseISO(endDate)).replace(
    /day.*/g,
    'night stay'
  );

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
