export interface Lodging {
  id?: string;
  type: string;
  name: string;
  description: string;
  facilities?: string[];
  price: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  maxCapacity: number;
  discount: number;
  imageCover?: string;
  images?: [];
  createdAt?: string;
}

export interface ResLodging {
  limit: number;
  page: number;
  results: number;
  status: 'success' | 'fail';

  data: Lodging[];
}
