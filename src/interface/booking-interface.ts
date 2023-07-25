export interface Booking {
  _id: string;
  lodging: { _id: string; name: string };
  user: { _id: string; name: string; email: string };
  price: number;
  numUsers: number;
  discount: number;
  totalPrice: number;
  startDate: string;
  endDate: string;
  paid: boolean;
  status: string;
  createdAt?: string;
}

export interface ResBooking {
  limit: number;
  page: number;
  results: number;
  status: 'success' | 'fail';

  data: Booking[];
}

export interface SumTotalPrice {
  status: string;
  data: {
    _id: null;
    sumTotalPrice: number;
  };
}

export interface PricePerday {
  status: string;
  data: {
    sumTotalPrice: string;
    _id: {
      month: number;
      day: number;
      year: number;
    };
  }[];
}

export interface StayDuration {
  status: string;
  data: {
    startDate: string;
    endDate: string;
    days: number;
  }[];
}
